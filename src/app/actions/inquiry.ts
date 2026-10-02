"use server";

import { createHash, randomUUID } from "node:crypto";
import { headers } from "next/headers";

import { env, getDeliveryMode } from "@/lib/env";
import {
  inquirySchema,
  MIN_COMPLETION_MS,
  type InquiryFormPayload,
} from "@/lib/validation/inquiry";
import type {
  InquiryFieldErrors,
  InquiryState,
} from "@/lib/validation/inquiry-state";

// The state shape and `initialInquiryState` are exported from
// `lib/validation/inquiry-state`, not from here: a `"use server"` module may
// only export async functions, so a value export here would be turned into a
// server reference on the client.

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

/**
 * In-memory rate limiter.
 *
 * Per-instance by nature. On a multi-instance deployment put a shared store in
 * front of this (or rely on the hosting platform's edge rate limits) and keep
 * this as a cheap first line of defence.
 */
const buckets = new Map<string, number[]>();

function rateLimitKey(ip: string, userAgent: string): string {
  const salt = env.rateLimitSalt ?? "kazes-local";
  return createHash("sha256")
    .update(`${salt}:${ip}:${userAgent.slice(0, 120)}`)
    .digest("hex")
    .slice(0, 32);
}

function isRateLimited(key: string, now: number): boolean {
  const attempts = (buckets.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (attempts.length >= RATE_LIMIT_MAX) {
    buckets.set(key, attempts);
    return true;
  }

  attempts.push(now);
  buckets.set(key, attempts);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [existingKey, timestamps] of buckets) {
      if (timestamps.every((timestamp) => now - timestamp >= RATE_LIMIT_WINDOW_MS)) {
        buckets.delete(existingKey);
      }
    }
  }

  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Plain-text body, built to be readable in a terminal as well as an inbox. */
function buildMessageBody(fields: {
  reference: string;
  name: string;
  email: string;
  company: string;
  website?: string;
  service: string;
  budget?: string;
  timeline: string;
  message: string;
}) {
  return [
    `Reference: ${fields.reference}`,
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Company: ${fields.company}`,
    `Website: ${fields.website || "—"}`,
    `Capability: ${fields.service}`,
    `Budget: ${fields.budget || "Not specified"}`,
    `Timeline: ${fields.timeline}`,
    "",
    "Project description",
    "-------------------",
    fields.message,
  ].join("\n");
}

async function deliverViaResend(
  to: string,
  from: string,
  apiKey: string,
  subject: string,
  text: string,
  replyTo: string,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend rejected the message (${response.status})${detail ? `: ${detail.slice(0, 300)}` : ""}`,
    );
  }
}

async function deliverViaWebhook(
  url: string,
  secret: string | null,
  payload: Record<string, unknown>,
): Promise<void> {
  const body = JSON.stringify(payload);
  const signature = secret
    ? createHash("sha256").update(body).digest("hex")
    : null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(signature ? { "x-kazes-signature": signature } : {}),
    },
    body,
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Webhook rejected the message (${response.status})`,
    );
  }
}

/**
 * Handles a project inquiry.
 *
 * Contract with the UI: the `success` status is returned **only** after a
 * delivery path has confirmed the message. Any other outcome surfaces as
 * `error` with an honest message, so a visitor is never told a submission
 * succeeded when it did not.
 */
export async function submitInquiry(
  _prevState: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const requestHeaders = await headers();
  const mode = getDeliveryMode();

  /* --- transport-level guards ------------------------------------------ */

  const expectedKey = env.formKey;
  if (expectedKey) {
    const providedKey = requestHeaders.get("x-kazes-form-key");
    if (providedKey !== expectedKey) {
      return {
        status: "error",
        message:
          "This form could not be verified. Please refresh the page and try again.",
        fieldErrors: {},
        reference: null,
      };
    }
  }

  const forwardedFor =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";
  const userAgent = requestHeaders.get("user-agent") ?? "unknown";

  if (isRateLimited(rateLimitKey(forwardedFor, userAgent), Date.now())) {
    return {
      status: "error",
      message:
        "Too many submissions from this connection. Please wait a few minutes, or email us directly.",
      fieldErrors: {},
      reference: null,
    };
  }

  /* --- validation ------------------------------------------------------- */

  const payload: InquiryFormPayload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    website: String(formData.get("website") ?? ""),
    service: String(formData.get("service") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    timeline: String(formData.get("timeline") ?? ""),
    message: String(formData.get("message") ?? ""),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    company_website_confirm: String(
      formData.get("company_website_confirm") ?? "",
    ),
    form_started_at: String(formData.get("form_started_at") ?? ""),
  };

  const parsed = inquirySchema.safeParse(payload);

  const fieldErrors: InquiryFieldErrors = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (
        typeof key === "string" &&
        !fieldErrors[key as keyof InquiryFieldErrors]
      ) {
        fieldErrors[key as keyof InquiryFieldErrors] = issue.message;
      }
    }
  }

  /* --- anti-spam: timing ------------------------------------------------ */

  const startedAt = Number(formData.get("form_started_at") ?? "0");
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return {
      status: "error",
      message:
        "This submission looked incomplete. Please refresh the page and try again.",
      fieldErrors: {},
      reference: null,
    };
  }

  const elapsed = Date.now() - startedAt;
  const completedTooFast = elapsed < MIN_COMPLETION_MS;

  /* --- anti-spam: honeypot ---------------------------------------------- */

  // The hidden field is only treated as a bot signal when the submission also
  // looks automated — filled in instantly, or with an invalid payload. An
  // aggressive password manager can legitimately populate a hidden field on a
  // slow, fully valid submission, and blocking a real person for that would be
  // the wrong trade.
  const honeypotFilled = payload.company_website_confirm.trim().length > 0;
  const looksAutomated = completedTooFast || !parsed.success;

  if (honeypotFilled && looksAutomated) {
    return {
      status: "error",
      message:
        "We could not accept that submission. Please refresh the page and try again.",
      fieldErrors: {},
      reference: null,
    };
  }

  if (completedTooFast) {
    return {
      status: "error",
      message: "That was submitted unusually quickly. Please try once more.",
      fieldErrors: {},
      reference: null,
    };
  }

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields and submit again.",
      fieldErrors,
      reference: null,
    };
  }

  /* --- delivery --------------------------------------------------------- */

  if (mode.kind === "unconfigured") {
    console.error(
      "[kazes/inquiry] No delivery path is configured. Set RESEND_API_KEY plus " +
        "CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL, or CONTACT_WEBHOOK_URL. " +
        "See .env.example and README.md.",
    );
    return {
      status: "error",
      message:
        "The inquiry form is not connected to an inbox yet. Please email us directly and we will pick it up from there.",
      fieldErrors: {},
      reference: null,
    };
  }

  const reference = `KZ-${randomUUID().slice(0, 8).toUpperCase()}`;
  const data = parsed.data;

  const fields = {
    reference,
    name: data.name,
    email: data.email,
    company: data.company,
    website: data.website,
    service: data.service,
    budget: data.budget || undefined,
    timeline: data.timeline,
    message: data.message,
  };

  const text = buildMessageBody(fields);
  const subject = `Project inquiry — ${data.company} (${data.service}) [${reference}]`;

  /*
   * Log-only mode is a development aid: it writes the submission to the
   * server log and stops. Nothing was delivered, so it must NOT return the
   * success state — the visitor is told plainly that this is a preview and
   * that nothing was sent.
   */
  if (mode.kind === "log") {
    console.info("[kazes/inquiry] CONTACT_LOG_ONLY is set — inquiry not delivered:", {
      reference,
      to: env.contact.to,
      from: data.email,
      company: data.company,
      capability: data.service,
      budget: data.budget ?? null,
      timeline: data.timeline,
      characters: data.message.length,
    });

    return {
      status: "error",
      message:
        "This form is running in preview mode, so your message was not delivered. Please email us directly instead.",
      fieldErrors: {},
      reference,
    };
  }

  try {
    if (mode.kind === "resend") {
      await deliverViaResend(
        env.contact.to as string,
        env.contact.from as string,
        env.contact.resendApiKey as string,
        subject,
        text,
        data.email,
      );
    } else {
      await deliverViaWebhook(env.contact.webhookUrl as string, env.contact.webhookSecret, {
        receivedAt: new Date().toISOString(),
        ...fields,
        // HTML variant for systems that render rich mail.
        html: `<h2>${escapeHtml(subject)}</h2><pre style="white-space:pre-wrap;font:14px/1.6 ui-monospace,monospace">${escapeHtml(text)}</pre>`,
      });
    }
  } catch (error) {
    console.error("[kazes/inquiry] Delivery failed:", error);
    return {
      status: "error",
      message:
        "We could not deliver your message. Please try again, or email us directly.",
      fieldErrors: {},
      reference,
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your inquiry has been delivered. We read every one and reply to most within two business days.",
    fieldErrors: {},
    reference,
  };
}
