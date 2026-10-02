"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import type { input as SchemaInput } from "zod";

import { Button } from "@/components/ui/button";
import {
  inquirySchema,
  SPAM_FIELDS,
  budgetValues,
  serviceOfInterestValues,
  timelineValues,
  type SpamFields,
} from "@/lib/validation/inquiry";
import {
  initialInquiryState,
  type InquiryState,
} from "@/lib/validation/inquiry-state";
import { cn } from "@/lib/cn";

import { submitInquiry } from "@/app/actions/inquiry";

/**
 * Derived from the schema's *input* type so react-hook-form and the resolver
 * agree. The hand-written `InquiryFormValues` shape is the post-transform
 * shape the server action consumes; the two intentionally differ, because the
 * schema trims and normalises between them.
 */
type FormValues = SchemaInput<typeof inquirySchema>;

/**
 * Wrapper.
 *
 * `useActionState` state lives in the inner component, so "send another
 * message" is implemented by remounting it with a new `key`. That resets the
 * action state, the react-hook-form state, and the anti-spam timer in one move
 * without a page reload.
 */
export function InquiryForm() {
  const [instance, setInstance] = useState(0);

  return <InquiryFormFields key={instance} onReset={() => setInstance((n) => n + 1)} />;
}

function InquiryFormFields({ onReset }: { onReset: () => void }) {
  const [state, formAction, pending] = useActionState<
    InquiryState,
    FormData
  >(submitInquiry, initialInquiryState);

  /*
   * When the visitor first engaged with the form.
   *
   * Held in state rather than a ref, and stamped from an event handler rather
   * than an effect: reading a ref or calling `Date.now()` during render is
   * impure. The value travels to the server in a real hidden input, so the
   * timing check works without any render-time side effects.
   */
  const [startedAt, setStartedAt] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(inquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      service: "",
      budget: "",
      timeline: "",
      message: "",
      consent: false,
    },
  });

  const stampStart = () => {
    if (startedAt === "") {
      setStartedAt(String(Date.now()));
    }
  };

  // A successful submission should not leave stale content behind.
  useEffect(() => {
    if (state.status === "success") {
      reset();
    }
  }, [state.status, reset]);

  const onSubmit = handleSubmit((values) => {
    const spam: SpamFields = {
      company_website_confirm: "",
      form_started_at: startedAt,
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (value === undefined || value === null) {
        formData.set(key, "");
      } else {
        formData.set(key, typeof value === "boolean" ? String(value) : value);
      }
    }
    for (const key of SPAM_FIELDS) {
      formData.set(key, spam[key]);
    }

    formAction(formData);
  });

  if (state.status === "success") {
    return <SuccessPanel state={state} onReset={onReset} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      onPointerDownCapture={stampStart}
      onKeyDownCapture={stampStart}
      onFocusCapture={stampStart}
      className="flex flex-col"
    >
      {/*
        Hidden anti-spam timing field. Empty until the visitor first interacts
        with the form; the server action rejects a submission that arrives
        without it or arrives implausibly quickly.
      */}
      <input type="hidden" name="form_started_at" value={startedAt} readOnly />
      <Fieldset>
        <Legend>Your details</Legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full name"
            error={errors.name?.message ?? state.fieldErrors.name}
            required
          >
            <input
              {...register("name")}
              type="text"
              autoComplete="name"
              maxLength={120}
              aria-invalid={Boolean(errors.name)}
              className={inputClass(Boolean(errors.name))}
            />
          </Field>

          <Field
            label="Work email"
            error={errors.email?.message ?? state.fieldErrors.email}
            required
          >
            <input
              {...register("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={200}
              aria-invalid={Boolean(errors.email)}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>

          <Field
            label="Company"
            error={errors.company?.message ?? state.fieldErrors.company}
            required
          >
            <input
              {...register("company")}
              type="text"
              autoComplete="organization"
              maxLength={160}
              aria-invalid={Boolean(errors.company)}
              className={inputClass(Boolean(errors.company))}
            />
          </Field>

          <Field
            label="Website"
            hint="Optional"
            error={errors.website?.message ?? state.fieldErrors.website}
          >
            <input
              {...register("website")}
              type="text"
              inputMode="url"
              autoComplete="url"
              placeholder="https://"
              maxLength={300}
              aria-invalid={Boolean(errors.website)}
              className={inputClass(Boolean(errors.website))}
            />
          </Field>
        </div>
      </Fieldset>

      <Fieldset>
        <Legend>About the work</Legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Capability"
            error={errors.service?.message ?? state.fieldErrors.service}
            required
          >
            <select
              {...register("service")}
              aria-invalid={Boolean(errors.service)}
              className={cn(inputClass(Boolean(errors.service)), "appearance-none")}
            >
              <option value="">Select a capability</option>
              {serviceOfInterestValues.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            label="Timeline"
            error={errors.timeline?.message ?? state.fieldErrors.timeline}
            required
          >
            <select
              {...register("timeline")}
              aria-invalid={Boolean(errors.timeline)}
              className={cn(inputClass(Boolean(errors.timeline)), "appearance-none")}
            >
              <option value="">Select a timeline</option>
              {timelineValues.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Budget range"
          hint="Optional"
          error={errors.budget?.message ?? state.fieldErrors.budget}
        >
          <select
            {...register("budget")}
            aria-invalid={Boolean(errors.budget)}
            className={cn(inputClass(Boolean(errors.budget)), "appearance-none")}
          >
            <option value="">Prefer not to say</option>
            {budgetValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Project description"
          hint={`${40} characters minimum`}
          error={errors.message?.message ?? state.fieldErrors.message}
          required
        >
          <textarea
            {...register("message")}
            rows={7}
            maxLength={6000}
            aria-invalid={Boolean(errors.message)}
            placeholder="What are you trying to build, what is getting in the way, and where do you need engineering support?"
            className={cn(
              inputClass(Boolean(errors.message)),
              "min-h-[11rem] resize-y leading-relaxed",
            )}
          />
        </Field>
      </Fieldset>

      {/* Honeypot. Hidden from users and assistive technology alike. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company_website_confirm">
          Company website confirmation
        </label>
        <input
          id="company_website_confirm"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <ConsentField
          error={errors.consent?.message ?? state.fieldErrors.consent}
          register={register}
        />

        <FormAlert state={state} pending={pending} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
            {pending ? (
              <>
                <Loader2
                  aria-hidden="true"
                  className="size-4 animate-spin motion-reduce:animate-none"
                  strokeWidth={1.5}
                />
                Sending
              </>
            ) : (
              <>
                Send inquiry
                <ArrowRight
                  aria-hidden="true"
                  className="size-4"
                  strokeWidth={1.5}
                />
              </>
            )}
          </Button>

          <p className="text-[0.78rem] leading-relaxed text-ink-ghost">
            We reply to most inquiries within two business days.
          </p>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */

function SuccessPanel({
  state,
  onReset,
}: {
  state: InquiryState;
  onReset: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-6 rounded-card border border-mocha/30 bg-cream p-8 md:p-10"
      role="status"
      aria-live="polite"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full bg-mocha/15 text-espresso">
        <Check aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>

      <div className="flex flex-col gap-3">
        <h2 className="text-[1.5rem] leading-snug text-ink">Inquiry delivered</h2>
        <p className="max-w-[52ch] text-[0.925rem] leading-relaxed text-ink-muted">
          {state.message}
        </p>
      </div>

      {state.reference ? (
        <p className="border-t border-rule-soft pt-5 font-mono text-[0.7rem] tracking-[0.1em] text-ink-ghost uppercase">
          Reference — {state.reference}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onReset}
        className="text-[0.82rem] font-medium text-ink underline underline-offset-4"
      >
        Send another message
      </button>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

function Fieldset({ children }: { children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5 border-0 p-0 not-last:mt-10">
      {children}
    </fieldset>
  );
}

function Legend({ children }: { children: React.ReactNode }) {
  return <legend className="tech-label mb-6 p-0 text-ink-faint">{children}</legend>;
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[0.8rem] font-medium tracking-[0.01em] text-ink">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-1 text-espresso">
              *
            </span>
          ) : null}
        </span>
        {hint ? (
          <span className="font-mono text-[0.65rem] tracking-[0.1em] text-ink-ghost uppercase">
            {hint}
          </span>
        ) : null}
      </div>

      {children}

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[0.78rem] text-ink"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function ConsentField({
  error,
  register,
}: {
  error?: string;
  register: ReturnType<typeof useForm<FormValues>>["register"];
}) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="flex cursor-pointer items-start gap-3 text-[0.82rem] leading-relaxed text-ink-muted">
        <input
          {...register("consent")}
          type="checkbox"
          checked={checked}
          onChange={(event) => setChecked(event.target.checked)}
          aria-invalid={Boolean(error)}
          className="mt-0.5 size-5 shrink-0 accent-espresso sm:size-4"
        />
        <span>
          I have read the{" "}
          <Link
            href="/privacy"
            className="text-ink underline underline-offset-4"
          >
            privacy policy
          </Link>{" "}
          and agree to my details being used to respond to this inquiry.
        </span>
      </label>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[0.78rem] text-ink"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function FormAlert({
  state,
  pending,
}: {
  state: InquiryState;
  pending: boolean;
}) {
  const message =
    state.status === "error" ? state.message || "Something went wrong." : "";

  return (
    <AnimatePresence initial={false}>
      {message && !pending ? (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          role="alert"
          aria-live="assertive"
          className="rounded-card border border-mocha/30 bg-mocha/8 px-5 py-4"
        >
          <p className="text-[0.85rem] leading-relaxed text-ink">
            {message}
          </p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */

function inputClass(invalid: boolean) {
  return cn(
    // `text-base` keeps every field at 16px on phones: iOS Safari zooms the
    // viewport when a focused field is smaller, which then leaves the page
    // scrolled sideways. Desktop drops back to the denser 0.9rem.
    "w-full rounded-input border bg-cream px-4 py-3 text-base text-ink md:text-[0.9rem]",
    "placeholder:text-ink-ghost/70",
    "transition-[border-color,box-shadow] duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-mocha/40 focus-visible:border-mocha",
    invalid
      ? "border-mocha/60 bg-mocha/8"
      : "border-rule bg-cream hover:border-mocha/60",
  );
}