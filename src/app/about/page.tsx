import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import {
  DrawInLine,
  HeroReveal,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { SystemMap } from "@/components/visuals/system-map";
import { services } from "@/content/services";
import { processStages } from "@/content/process";

export const metadata: Metadata = {
  title: "About",
  description:
    "KAZES.studio is a San Francisco engineering startup. We embed senior engineers with ambitious teams to design, build, and deploy software, AI systems, and hardware.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — KAZES.studio",
    description:
      "An engineering startup, not an agency. How we work, what we value, and who we work best with.",
    url: "/about",
  },
};

const VALUES = [
  {
    title: "Ownership over recommendation",
    body: "We are not paid to hand you a document. We are engaged against a technical outcome, which means the system has to work in the real environment — with real data, real permissions, and real uptime expectations.",
  },
  {
    title: "Close to the problem",
    body: "The people with the best judgement about your operation are usually not in the meeting. We build the feedback loop that brings their knowledge into the work instead of routing everything through a single point of contact.",
  },
  {
    title: "Systems that outlive us",
    body: "Everything we build is documented, tested, and handed over. If our involvement is a single point of failure, we did the job badly.",
  },
  {
    title: "Honest about what is hard",
    body: "Some problems have no clean answer. We say so early, bring the trade-offs with their costs attached, and let you make the call with real information.",
  },
];

const DIFFERENTIATORS = [
  {
    claim: "We embed, we do not advise",
    detail:
      "No findings document waiting to be implemented by someone else. Our engineers join your standups, use your repositories, and are accountable to your lead.",
  },
  {
    claim: "Engineering across the whole stack",
    detail:
      "Firmware, infrastructure, intelligence, and interface sit in the same team, so a problem does not get handed sideways when it crosses a boundary.",
  },
  {
    claim: "Senior by default",
    detail:
      "The people in the repository are the people you met. We do not staff a junior shadow team behind a senior name.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section labelledBy="about-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />
        

        <Container className="pt-16 pb-16 md:pt-24 md:pb-20">
          <HeroReveal>
            <Eyebrow>About the studio</Eyebrow>
          </HeroReveal>
          <HeroReveal delay={0.08} className="mt-8">
            <h1 id="about-title" className="display-hero max-w-[15ch] text-ink">
              An engineering startup. Not an agency.
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.16} className="mt-8 max-w-[60ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              KAZES.studio was built around a simple observation: the hardest
              engineering problems get worse when the people solving them are
              far from the people living with the result. We structured the
              company so that distance is impossible.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      <StorySection />
      <DisciplinesSection />
      <MethodSection />
      <WhoWeWorkWithSection />
      <AboutCta />
      {/* The one dark block on this page, last before the footer, so the page
          reads white all the way down and only turns black as it ends. */}
      <ValuesSection />
    </>
  );
}

function StorySection() {
  return (
    <Section labelledBy="story-title" className="pb-20 md:pb-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Why we exist</Eyebrow>
            <h2 id="story-title" className="display-md max-w-[16ch] text-ink">
              Distance is expensive.
            </h2>
            <SystemMap className="mx-auto mt-4 w-full max-w-[26rem] lg:hidden" />
          </Reveal>

          <RevealGroup className="flex flex-col">
            <RevealItem>
              <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
                Almost every failed engineering project we have been called in to
                rescue failed for the same reason: the people building it were
                working from a description of the problem rather than the
                problem. Requirements were filtered through a chain of
                stakeholders until they described something buildable, but not
                anything useful.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-muted">
                So we built the company the other way around. Our engineers work
                inside the team that owns the outcome, in the systems that
                actually run, with the constraints that actually apply. They sit
                in the operations review. They get the alert at 2am. That
                proximity is not a service differentiator we sell — it is simply
                how the work has to be done to be worth anything.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink-muted">
                The result is a studio that looks a lot like an engineering team
                and behaves like one: accountable for what ships, honest about
                what is hard, and gone once your team can run it without us.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

function ValuesSection() {
  return (
    <Section
      surface="dark"
      labelledBy="values-title"
      className="relative isolate overflow-hidden bg-espresso py-20 text-cream md:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-40" />
            <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="dark">What we hold to</Eyebrow>
          <h2 id="values-title" className="display-md max-w-[20ch] text-cream">
            Four commitments we will not trade away.
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {VALUES.map((value, index) => (
            <RevealItem key={value.title}>
              <div className="border-t border-cream/15 pt-6">
                <span className="tech-label text-cream/45 tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[1.25rem] leading-snug text-cream">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-[44ch] text-[0.9rem] leading-relaxed text-cream/60">
                  {value.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function DisciplinesSection() {
  return (
    <Section labelledBy="disciplines-title" className="py-20 md:py-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 id="disciplines-title" className="display-md max-w-[24ch] text-ink">
            Three disciplines, staffed as one team.
          </h2>
        </div>

        <RevealGroup className="mt-14 flex flex-col">
          {services.map((service) => (
            <RevealItem key={service.slug}>
              <Link
                href={service.href}
                className="group grid gap-4 border-t border-rule-soft py-8 transition-colors md:grid-cols-[minmax(0,3rem)_minmax(0,1fr)_minmax(0,1.2fr)_auto] md:items-baseline md:gap-10"
              >
                <span className="tech-label text-cream/45 tnum">{service.index}</span>
                <h3 className="text-[1.3rem] leading-snug text-ink">
                  {service.title}
                </h3>
                <p className="max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-muted">
                  {service.lede}
                </p>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-ink-ghost transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso motion-reduce:transition-none"
                  strokeWidth={1.5}
                />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function MethodSection() {
  return (
    <Section labelledBy="method-title" className="pb-20 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>How we work</Eyebrow>
          <h2 id="method-title" className="display-md max-w-[24ch] text-ink">
            The same method on every engagement.
          </h2>
        </div>

        <RevealGroup className="mt-14 flex flex-col">
          {processStages.map((stage) => (
            <RevealItem key={stage.index}>
              <div className="grid gap-4 border-t border-rule-soft py-8 md:grid-cols-[minmax(0,3rem)_minmax(0,14rem)_minmax(0,1fr)] md:gap-10">
                <span className="tech-label text-cream/45 tnum">{stage.index}</span>
                <h3 className="text-[1.15rem] leading-snug text-ink">
                  {stage.title}
                </h3>
                <div>
                  <p className="text-[0.925rem] leading-relaxed text-ink-muted">
                    {stage.summary}
                  </p>
                  <p className="mt-3 font-mono text-[0.65rem] tracking-[0.12em] text-ink-ghost uppercase">
                    {stage.note}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function WhoWeWorkWithSection() {
  return (
    <Section labelledBy="differentiators-title" className="pb-20 md:pb-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>Who we work best with</Eyebrow>
            <h2
              id="differentiators-title"
              className="display-md max-w-[18ch] text-ink"
            >
              Teams with a hard problem and real constraints.
            </h2>
            <p className="max-w-[48ch] text-[0.95rem] leading-relaxed text-ink-muted">
              We are most useful when the problem is genuinely technical, the
              stakes are real, and there is an internal team who will own the
              result. We are least useful as a way to avoid an engineering
              decision.
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.claim} className="flex gap-4 border-t border-rule-soft pt-5">
                  <DrawInLine />
                  <div>
                    <p className="text-[0.95rem] font-medium text-ink">
                      {item.claim}
                    </p>
                    <p className="mt-2 max-w-[46ch] text-[0.875rem] leading-relaxed text-ink-muted">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-card border border-rule-soft bg-cream p-8 md:p-10">
              <p className="tech-label text-ink-ghost">Common starting points</p>
              <ul className="mt-7 flex flex-col">
                {[
                  "A prototype that stopped short of production",
                  "A system whose only expert is on holiday",
                  "An AI feature that shipped and underperformed",
                  "A device that works on the bench and not in the field",
                  "A team hiring a role they cannot fill quickly enough",
                  "An integration nobody wants to own",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-rule-soft py-3.5 text-[0.9rem] leading-snug text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] size-1 shrink-0 rounded-full bg-mocha/70"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/contact" className="mt-8" arrow>
                Discuss your situation
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function AboutCta() {
  return (
    <Section className="pb-24 md:pb-32">
      <Container>
        <Reveal>
          <div className="grain relative isolate overflow-hidden rounded-card px-7 py-14 md:px-14 md:py-20">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background:
                  "linear-gradient(140deg, #0a0a0a 0%, #151515 52%, #262626 100%)",
              }}
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-40" />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h2 className="display-md max-w-[20ch] text-ink">
                  If it is hard and it matters, we should talk.
                </h2>
                <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-ink-muted">
                  Tell us what you are trying to build and where it is stuck. We
                  will come back with a technical read on the problem and a
                  realistic path through it.
                </p>
              </div>

              <ButtonLink href="/contact" size="lg" arrow>
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}