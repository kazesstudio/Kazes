import { ButtonLink } from "@/components/ui/button";
import { ContactEmailLink } from "@/components/layout/contact-email";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { Container, Section } from "@/components/ui/section";

/**
 * Closing call to action. A flat inverted block with an acid rule — the page stops
 * here rather than tapering into another decorative band.
 */
export function FinalCta() {
  return (
    <Section
      id="contact-cta"
      surface="dark"
      className="relative isolate overflow-hidden bg-espresso py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hairline-grid opacity-60"
      />

      <Container>
        <Reveal className="flex flex-col gap-10">
          <div
            aria-hidden="true"
            className="gold-rule h-px w-full opacity-70"
          />

          <SplitHeading
            lines={["Have a problem", "worth solving?"]}
            accentIndex={1}
            tone="dark"
            className="display-lg max-w-[16ch] text-cream"
          />

          <div className="grid gap-8 border-t border-cream/15 pt-8 md:grid-cols-12 md:items-end">
            <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-cream/60 md:col-span-6">
              Tell us what you&rsquo;re working on, what is getting in the way,
              and where you need engineering support. You will get a straight
              answer about whether we are the right fit.
            </p>
            <div className="flex flex-col items-start gap-4 md:col-span-6 md:items-end">
              <ButtonLink href="/contact" variant="onDark" size="lg" arrow>
                Start a conversation
              </ButtonLink>
              <ContactEmailLink tone="dark" className="text-[0.82rem]" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}