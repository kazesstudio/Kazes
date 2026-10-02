import type { Metadata } from "next";

import { HeroReveal, Reveal } from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { WorkFilter } from "@/components/work/work-filter";
import { workCategories } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Concept studies and engineering deep-dives across AI systems, developer infrastructure, connected hardware, and enterprise automation — architecture, stack, and trade-offs written up in full.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — KAZES.studio",
    description:
      "Engineering concept studies with full architecture, stack, and trade-offs.",
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <Section labelledBy="work-title" className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-50" />
                <Container className="pt-16 pb-14 md:pt-24 md:pb-16">
          <HeroReveal>
            <Eyebrow>Selected work</Eyebrow>
          </HeroReveal>
          <HeroReveal delay={0.08} className="mt-8">
            <h1 id="work-title" className="display-hero max-w-[14ch] text-ink">
              Engineering, in the detail.
            </h1>
          </HeroReveal>
          <HeroReveal delay={0.16} className="mt-8 max-w-[62ch]">
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              Each project below is a concept study — a full technical write-up
              of how we would approach the problem, what the architecture looks
              like, what it runs on, and what we would expect to learn. We
              publish these instead of padding the page with anonymised logos.
            </p>
          </HeroReveal>
        </Container>
      </Section>

      <Section aria-label="Project index" className="pb-24 md:pb-32">
        <Container>
          {/* The grid below is a list of h3 case-study titles, so the region
              needs an h2 for the outline to be valid. Visually the filter row
              is the entry point, so the heading stays for screen readers. */}
          <h2 className="sr-only">Project index</h2>
          <WorkFilter />
        </Container>
      </Section>

      <DisciplineBand />
    </>
  );
}

/** Category roll-up, so the shape of the portfolio is visible at a glance. */
function DisciplineBand() {
  return (
    <Section surface="dark" className="relative isolate overflow-hidden bg-espresso py-20 text-cream md:py-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-40" />
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow tone="dark">Disciplines covered</Eyebrow>
          <h2 className="display-md max-w-[24ch] text-cream">
            One team across four problem shapes.
          </h2>
        </Reveal>

        <dl className="mt-12 flex flex-col">
          {workCategories.map((category) => (
            <Reveal key={category.slug}>
              <div className="grid gap-2 border-t border-cream/15 py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-baseline md:gap-10">
                <dt className="text-[1.05rem] text-cream">{category.label}</dt>
                <dd className="max-w-[62ch] text-[0.9rem] leading-relaxed text-cream/60">
                  {category.blurb}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}