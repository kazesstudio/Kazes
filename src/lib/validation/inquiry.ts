import { z } from "zod";

/**
 * Shared between the client form and the server action, so client-side
 * validation and server-side validation can never drift apart.
 *
 * Field-level messages are written for a visitor, not for a developer.
 */

const trimmed = (max: number) => z.string().trim().max(max);

export const serviceOfInterestValues = [
  { value: "forward-deployed-engineering", label: "Forward-deployed engineering" },
  { value: "ai-systems", label: "AI & software systems" },
  { value: "hardware", label: "Hardware & embedded engineering" },
  { value: "discovery", label: "Technical discovery" },
  { value: "unsure", label: "Not sure yet — help me scope it" },
  { value: "other", label: "Something else" },
] as const;

export const budgetValues = [
  "Not defined yet",
  "Under $50k",
  "$50k – $150k",
  "$150k – $500k",
  "$500k+",
  "Prefer to discuss",
] as const;

export const timelineValues = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Exploring for later",
] as const;

export const inquirySchema = z.object({
  name: trimmed(120).min(2, "Please enter your full name."),
  email: trimmed(200)
    .min(1, "Please enter your work email address.")
    .email("Please enter a valid email address."),
  company: trimmed(160).min(1, "Please enter your company name."),
  website: trimmed(300)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined))
    .refine(
      (value) => {
        if (!value) return true;
        return /^https?:\/\/.+\..+/.test(value) || /^[\w-]+(\.[\w-]+)+.*$/.test(value);
      },
      { message: "Enter a full URL, for example https://yourcompany.com" },
    ),
  service: z.enum(
    serviceOfInterestValues.map((option) => option.value) as [
      string,
      ...string[],
    ],
    { message: "Select the capability you are interested in." },
  ),
  budget: z
    .enum(budgetValues as unknown as [string, ...string[]], {
      message: "Select a budget range, or choose “Prefer to discuss”.",
    })
    .optional()
    .or(z.literal("")),
  timeline: z.enum(timelineValues as unknown as [string, ...string[]], {
    message: "Select an expected timeline.",
  }),
  message: trimmed(6000)
    .min(40, "Please describe the project in at least 40 characters.")
    .max(6000, "Please keep the description under 6000 characters."),
  consent: z
    .union([z.literal("on"), z.literal("true"), z.boolean()])
    .refine((value) => value === true || value === "on" || value === "true", {
      message: "Please confirm you have read the privacy policy.",
    }),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

/** Plain shape the client component binds to. */
export type InquiryFormValues = {
  name: string;
  email: string;
  company: string;
  website: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  consent: boolean;
};

/**
 * Fields the client component owns. The remaining inputs are anti-spam and are
 * never displayed.
 */
export const SPAM_FIELDS = ["company_website_confirm", "form_started_at"] as const;

export type SpamFields = {
  company_website_confirm: string;
  form_started_at: string;
};

export type InquiryFormPayload = InquiryFormValues & SpamFields;

export const MIN_COMPLETION_MS = 2500;
