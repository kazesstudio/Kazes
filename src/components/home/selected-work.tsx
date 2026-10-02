import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { ConceptBadge } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { caseStudies, caseStudySlugs } from "@/content/case-studies";
import { categoryLabel } from "@/components/work/case-study-card";

/** Four featured projects. */
const featured = caseStudies.slice(0, 4);

/**
 * Selected work as an editorial index — a ruled list rather than a card grid.
 * Hovering a row exposes the category and slides the arrow; there is no shadow,
 * no lift, and no rounded container.
 */
export function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-title" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal className="flex flex-col gap-6">
              <Eyebrow>03 / Selected work</Eyebrow>
              <SplitHeading
                id="work-title"
                lines={["Systems we have", "designed in detail."]}
                accentIndex={1}
                className="max-w-[16ch]"
              />
            </Reveal>
          </div>
          <Reveal delay={0.08} className="md:col-span-5 md:justify-self-end">
            <ButtonLink href="/work" variant="outline" arrow>
              Explore our work
            </ButtonLink>
          </Reveal>
        </div>

        {/*
          Every example project is a concept study until it is replaced with
          verified client work. Stated here once, rather than as a badge on each
          card.
        */}
        <Reveal delay={0.12} className="mt-10 max-w-[62ch]">
          <p className="border-l border-mocha pl-4 text-[0.85rem] leading-relaxed text-ink-faint">
            <span className="font-medium text-ink-muted">About these examples.</span>{" "}
            They are concept studies written to demonstrate the depth and shape
            of our engineering — not client engagements. We publish them rather
            than padding this page with anonymised logos, and we replace them
            with verified work as it is cleared for release.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-14">
          <ul className="border-t border-rule">
            {featured.map((study, index) => (
              <li key={study.slug}>
                <Link
                  href={`/work/${study.slug}`}
                  className="group/row grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-rule py-7 transition-colors duration-300 motion-reduce:transition-none hover:bg-ivory sm:grid-cols-12 md:py-8"
                >
                  <span className="tech-label tnum text-ink-ghost sm:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="sm:col-span-5">
                    <span className="display-sm block text-ink transition-colors group-hover/row:text-espresso">
                      {study.title}
                    </span>
                  </span>

                  <span className="tech-label text-ink-faint sm:col-span-2">
                    {categoryLabel(study.category)}
                  </span>

                  <span className="flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end">
                    {study.isConcept ? (
                      <ConceptBadge />
                    ) : (
                      <span className="tech-label text-ink-faint">Client work</span>
                    )}
                    <span
                      aria-hidden="true"
                      className="text-espresso transition-transform duration-300 group-hover/row:translate-x-1 motion-reduce:transition-none"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="mt-8">
          <p className="text-[0.85rem] text-ink-muted">
            {caseStudySlugs.length} projects in total, each with architecture,
            stack and constraint detail.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}