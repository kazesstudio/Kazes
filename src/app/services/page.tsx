import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { IndexMark } from "@/components/ui/card";
import { HeroReveal, Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { services } from "@/content/services";

export default function ServicesPage() {
  return (
    <>
      <Section labelledBy="services-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-50" />
                <Container className="pt-16 pb-16 md:pt-24 md:pb-20">
          <HeroReveal>
            <Eyebrow>Engineering capabilities</Eyebrow>
          </HeroReveal>
          <HeroReveal delay={0.08} className="mt-8">
            <h1 id="services-title" className="display-hero max-w-[16ch] text-ink">
              Three disciplines, one engineering team.
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.16} className="mt-8 max-w-[58ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              We are an engineering startup, not an agency. That means we take
              technical responsibility for outcomes across software, AI, and
              hardware — and we staff engagements so the boundary between those
              disciplines never becomes a handover.
            </p>
          </HeroReveal>

          <HeroReveal
            delay={0.24}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/contact" size="lg" arrow>
              Discuss your project
            </ButtonLink>
            <ButtonLink href="/work" variant="outline" size="lg">
              See the work
            </ButtonLink>
          </HeroReveal>
        </Container>
      </Section>

      <Section aria-label="Capability index" className="pb-24 md:pb-32">
        <Container>
          <ul className="flex flex-col">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.05}>
                <li className="border-t border-rule-soft">
                  <ServiceRow service={service} />
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <ProcessReference />
      <EngagementOverview />
    </>
  );
}

function ServiceRow({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    // Two columns, not three. An earlier version put the heading in a 4rem
    // track sized for the index mark alone, which crushed the display type
    // into a 64px box. The mark now shares the heading's column.
    <article className="group grid gap-6 py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 md:py-14">
      <div className="flex flex-col">
        <div className="flex items-baseline gap-3 md:block">
          <IndexMark>{service.index}</IndexMark>
          <h2 className="display-md text-ink md:mt-4">{service.title}</h2>
        </div>

        <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-relaxed text-ink-muted">
          {service.lede}
        </p>

        <Link
          href={service.href}
          className="mt-6 inline-flex min-h-11 w-fit items-center gap-1.5 text-[0.85rem] font-medium text-ink underline-offset-4 transition-colors hover:text-espresso hover:underline md:min-h-0"
        >
          Explore {service.shortTitle.toLowerCase()}
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div>
        <p className="tech-label text-ink-ghost">Capabilities</p>
        <ul className="mt-5 grid gap-x-6 gap-y-2.5 lg:grid-cols-2">
          {service.capabilities.map((capability) => (
            <li
              key={capability}
              className="flex items-start gap-2.5 text-[0.85rem] leading-snug text-ink-muted"
            >
              <span
                aria-hidden="true"
                className="mt-[0.5em] size-1 shrink-0 rounded-full bg-mocha/70"
              />
              {capability}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function EngagementOverview() {
  return (
    <Section
      surface="dark"
      className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-espresso py-20 text-cream md:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-40" />
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="dark">Common questions</Eyebrow>
          <h2 className="display-md max-w-[20ch] text-cream">
            How a capability becomes an engagement.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            {
              q: "Do you take ownership of the outcome?",
              a: "Yes. We are engaged against a technical objective, not a list of hours. If the system does not solve the problem, the work is not finished — including the deployment, the runbooks, and the handover.",
            },
            {
              q: "Can you work alongside an existing team?",
              a: "That is most of what we do. Our engineers use your repositories, your CI, and your review process. They sit in your standups and are accountable to your lead, not to us.",
            },
            {
              q: "What happens when you leave?",
              a: "Documented architecture decisions, runbooks, and a working handover. Build knowledge into your systems and your team's judgement rather than depending on our availability.",
            },
          ].map((item) => (
            <RevealItem key={item.q}>
              <div className="border-t border-cream/15 pt-6">
                <h3 className="text-[1.05rem] leading-snug text-cream">
                  {item.q}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-cream/60">
                  {item.a}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function ProcessReference() {
  const stages = [
    { index: "01", title: "Discover", meta: "Context · constraints · criteria" },
    { index: "02", title: "Design", meta: "Architecture · plan · risk" },
    { index: "03", title: "Build", meta: "Integration · CI · review" },
    { index: "04", title: "Deploy", meta: "Monitoring · runbooks · handover" },
  ];

  return (
    <Section className="py-20 md:py-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>The method</Eyebrow>
          <h2 className="display-md max-w-[22ch] text-ink">
            Four stages, applied to every capability.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage) => (
            <RevealItem key={stage.index}>
              <div className="flex h-full flex-col bg-cream p-6">
                <span className="tech-label text-espresso tnum">{stage.index}</span>
                <h3 className="mt-5 text-xl text-ink">{stage.title}</h3>
                <p className="mt-2 font-mono text-[0.65rem] leading-relaxed tracking-[0.1em] text-ink-ghost uppercase">
                  {stage.meta}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.06} className="mt-10">
          <p className="max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-muted">
            Each capability page below describes how the method adapts when the
            work is specifically about deployment, intelligence, or hardware.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
