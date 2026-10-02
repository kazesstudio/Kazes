/**
 * Runtime access to server-only configuration.
 *
 * Every value is read lazily and validated so a misconfigured deployment fails
 * loudly on the server instead of silently producing a broken integration.
 */

import { siteConfig } from "@/content/site";

/** Reads an env var at call time so it is never captured at module load. */
function readEnv(name: string): string | null {
  const value = process.env[name];
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export const env = {
  /**
   * Canonical production origin, without a trailing slash. Falls back to the
   * site config value, which itself falls back to the production domain.
   */
  siteUrl(): string {
    return (readEnv("NEXT_PUBLIC_SITE_URL") ?? siteConfig.url).replace(/\/$/, "");
  },

  /** Enables OpenGraph image generation in development. */
  isDev: process.env.NODE_ENV !== "production",

  contact: {
    /** Where inquiries are delivered. */
    to: readEnv("CONTACT_TO_EMAIL"),

    /** Verified sending identity. */
    from: readEnv("CONTACT_FROM_EMAIL"),

    /** Optional provider API key (Resend). */
    resendApiKey: readEnv("RESEND_API_KEY"),

    /**
     * Generic webhook fallback. Receives the inquiry as JSON. Useful when the
     * team wants to route leads into a CRM or an internal queue instead of an
     * inbox.
     */
    webhookUrl: readEnv("CONTACT_WEBHOOK_URL"),
    webhookSecret: readEnv("CONTACT_WEBHOOK_SECRET"),

    /**
     * Set to `1` (or `true`) to accept submissions and log them to the server
     * console instead of delivering them. Intended for local development and
     * preview deployments only — it is never a production delivery path.
     */
    logOnly: readEnv("CONTACT_LOG_ONLY") === "1",
  },

  /**
   * Hashed client IP salt used for coarse rate limiting. Must be set in
   * production; without it, rate limiting falls back to an in-memory counter
   * that is per-instance and therefore weaker.
   */
  rateLimitSalt: readEnv("CONTACT_RATE_LIMIT_SALT"),

  /** Shared secret expected in the `x-kazes-form-key` header, if enabled. */
  formKey: readEnv("CONTACT_FORM_KEY"),
};

/**
 * Whether a real delivery path is configured. The contact form uses this to
 * choose between "deliver" and an honest, explicit failure — it never reports
 * success for a message that was not sent.
 */
export function getDeliveryMode():
  | { kind: "resend" }
  | { kind: "webhook" }
  | { kind: "log" }
  | { kind: "unconfigured" } {
  if (env.contact.logOnly) return { kind: "log" };
  if (env.contact.resendApiKey && env.contact.to && env.contact.from) {
    return { kind: "resend" };
  }
  if (env.contact.webhookUrl) return { kind: "webhook" };
  return { kind: "unconfigured" };
}

export function isDeliveryConfigured(): boolean {
  return getDeliveryMode().kind !== "unconfigured";
}
