import type { Metadata } from "next";
import { Mail } from "lucide-react";

import { InquiryForm } from "@/components/contact/inquiry-form";
import { HeroReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with KAZES.studio. Tell us what you are trying to build, what is getting in the way, and where you need engineering support.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — KAZES.studio",
    description:
      "Tell us what you are trying to build and where it is stuck.",
    url: "/contact",
  },
};

const EXPECTATIONS = [
  {
    title: "A technical read, not a sales response",
    body: "Your note goes to engineers. You will get a view on the problem and a realistic path through it, including what we would do first.",
  },
  {
    title: "Straight answers on fit",
    body: "If we are the wrong team for this, we will say so and point you somewhere better. That costs us work and saves everyone time.",
  },
  {
    title: "Scope before commitment",
    body: "Most engagements begin with technical discovery. It is short, it is decision-oriented, and you keep the roadmap either way.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Section labelledBy="contact-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />
                <Container className="pt-16 pb-14 md:pt-24 md:pb-16">
          <HeroReveal>
            <Eyebrow>Contact</Eyebrow>
          </HeroReveal>
          <HeroReveal delay={0.08} className="mt-8">
            <h1 id="contact-title" className="display-hero max-w-[15ch] text-ink">
              Tell us what you&rsquo;re working on.
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.16} className="mt-8 max-w-[58ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              The more specific you can be about the constraint you are hitting,
              the more useful our first reply will be.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      <Section aria-label="Inquiry form" className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-20">
            <Reveal>
              <div className="rounded-card border border-rule-soft bg-cream/70 p-7 backdrop-blur-sm md:p-10">
                <InquiryForm />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="flex flex-col gap-10">
              <AsideBlock title="What happens next">
                <ul className="flex flex-col">
                  {EXPECTATIONS.map((item) => (
                    <li key={item.title} className="border-t border-rule-soft py-5 first:border-t-0 first:pt-0">
                      <h3 className="text-[0.95rem] leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-muted">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </AsideBlock>

              <AsideBlock title="Direct">
                <ContactEmail />
              </AsideBlock>

              <AsideBlock title="Capabilities">
                <ul className="flex flex-col gap-2.5">
                  {services.map((service) => (
                    <li key={service.slug} className="flex items-baseline gap-2.5">
                      <span
                        aria-hidden="true"
                        className="font-mono text-[0.65rem] tracking-[0.14em] text-espresso tnum"
                      >
                        {service.index}
                      </span>
                      <span className="text-[0.85rem] text-ink-muted">
                        {service.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </AsideBlock>
            </Reveal>
          </div>
        </Container>
      </Section>

      <ReassuranceBand />
    </>
  );
}

function AsideBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* A real heading, not a styled paragraph: the items below are h3, and
          without this the document skipped from h1 straight to h3. */}
      <h2 className="tech-label text-ink-ghost">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

/**
 * The address is only linked when a real inbox has been provisioned. When it is
 * not, it is shown as plain text with a visible note, so nobody clicks a
 * `mailto:` that bounces and nobody is shown a fabricated contact point.
 */
function ContactEmail() {
  if (!siteConfig.contactEmailIsLive) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-[0.85rem] leading-relaxed text-ink-muted">
          A public inbox has not been published yet. Use the form — it reaches
          the same place.
        </p>
        <p className="font-mono text-[0.75rem] tracking-[0.08em] text-ink-ghost uppercase">
          Inbox pending configuration
        </p>
      </div>
    );
  }

  return (
    <a
      href={`mailto:${siteConfig.contactEmail}`}
      className="inline-flex min-h-11 items-center gap-2.5 text-[0.95rem] text-ink underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-mocha md:min-h-0"
    >
      <Mail aria-hidden="true" className="size-4 shrink-0 text-espresso" strokeWidth={1.5} />
      {siteConfig.contactEmail}
    </a>
  );
}

function ReassuranceBand() {
  return (
    <Section surface="dark" className="relative isolate overflow-hidden bg-espresso py-16 text-cream md:py-20">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-40" />
      <Container>
        <RevealGroup className="grid gap-8 sm:grid-cols-3">
          {[
            "Your details are used only to respond to this inquiry.",
            "No mailing list, no newsletter, no third-party sharing.",
            "Read our privacy policy for the full detail.",
          ].map((item) => (
            <RevealItem key={item}>
              <p className="text-[0.85rem] leading-relaxed text-cream/60">
                {item}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}