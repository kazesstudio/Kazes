/**
 * Shared shape for the inquiry server action.
 *
 * This lives outside the `"use server"` module on purpose. A `"use server"`
 * file may only export async functions, so exporting a plain object such as
 * `initialInquiryState` from there turns it into a server reference when
 * imported by a client component — which silently passes a function where the
 * action state is expected.
 */

export type InquiryFieldErrors = Partial<
  Record<
    | "name"
    | "email"
    | "company"
    | "website"
    | "service"
    | "budget"
    | "timeline"
    | "message"
    | "consent"
    | "form",
    string
  >
>;

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: InquiryFieldErrors;
  /** Reference the visitor can quote in a follow-up. */
  reference: string | null;
};

export const initialInquiryState: InquiryState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  reference: null,
};