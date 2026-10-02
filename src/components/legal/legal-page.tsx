import type { ReactNode } from "react";

import { Container, Eyebrow, Section } from "@/components/ui/section";

/**
 * Shared shell for the legal pages. Keeps the typography and spacing identical
 * between /privacy and /terms so the two documents read as one set.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Section labelledBy="legal-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />

        <Container className="pt-16 pb-12 md:pt-24 md:pb-14">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 id="legal-title" className="display-hero mt-8 max-w-[18ch] text-ink">
            {title}
          </h1>
          <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-muted">
            {intro}
          </p>
          <p className="tech-label mt-8 text-ink-ghost">Last updated {updated}</p>
        </Container>
      </Section>

      <Section aria-label={`${title} — full text`} className="pb-24 md:pb-32">
        <Container>
          <div className="max-w-[68ch]">{children}</div>
        </Container>
      </Section>
    </>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-rule-soft pt-8 pb-10">
      <h2 className="text-[1.35rem] leading-snug tracking-[-0.01em] text-ink">
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-[0.95rem] leading-relaxed text-ink-muted [&_a]:text-espresso [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:marker:text-espresso">
        {children}
      </div>
    </section>
  );
}