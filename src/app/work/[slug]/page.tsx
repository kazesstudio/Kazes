import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { ConceptBadge } from "@/components/ui/card";
import {
  DrawInLine,
  HeroReveal,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { ArchitectureDiagram } from "@/components/visuals/architecture-diagram";
import { TechnicalFigure } from "@/components/visuals/technical-figure";
import {
  caseStudies,
  getCaseStudy,
  workCategories,
  type CaseStudy,
} from "@/content/case-studies";
import { getService } from "@/content/services";
import { cn } from "@/lib/cn";
import { env } from "@/lib/env";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    return { title: "Project not found" };
  }

  const path = `/work/${study.slug}`;

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      title: `${study.title} — KAZES.studio`,
      description: study.summary,
      url: path,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) {
    notFound();
  }

  const category = workCategories.find((item) => item.slug === study.category);
  const related = caseStudies
    .filter(
      (item) =>
        item.slug !== study.slug &&
        item.services.some((service) => study.services.includes(service)),
    )
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    url: `${env.siteUrl()}/work/${study.slug}`,
    dateCreated: study.year,
    genre: category?.label,
    // Concept studies are explicitly not client work, so `about`/creator claims
    // stay minimal and no `provider` or client claim is emitted.
    isAccessibleForFree: true,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <CaseHero study={study} categoryLabel={category?.label ?? study.category} />
      <ChallengeSection study={study} />
      <ConstraintsSection study={study} />
      <ApproachSection study={study} />
      <ArchitectureSection study={study} />
      <StackSection study={study} />
      <OutcomesSection study={study} />
      <LessonsSection study={study} />
      <RelatedSection related={related} />
    </>
  );
}

function CaseHero({
  study,
  categoryLabel,
}: {
  study: CaseStudy;
  categoryLabel: string;
}) {
  return (
    <Section labelledBy="case-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />
            <Container className="pt-12 pb-16 md:pt-16 md:pb-20">
        <HeroReveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[0.82rem] text-ink-faint transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            All projects
          </Link>
        </HeroReveal>

        <HeroReveal delay={0.06} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <Eyebrow>{categoryLabel}</Eyebrow>
          {study.isConcept ? <ConceptBadge /> : null}
        </HeroReveal>

        <HeroReveal delay={0.12} className="mt-6">
          <h1 id="case-title" className="display-hero max-w-[17ch] text-ink">
            {study.title}
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.18} className="mt-8 max-w-[60ch]">
          <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
            {study.summary}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.24} className="mt-12">
          <dl className="grid gap-x-8 gap-y-6 border-t border-rule-soft pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Engagement", value: study.engagement },
              { label: "Duration", value: study.duration },
              { label: "Year", value: study.year },
              {
                label: "Client",
                value: study.client ??
                  (study.clientDisclosed ? "Under NDA" : "Not applicable"),
              },
            ].map((item) => (
              <div key={item.label}>
                <dt className="tech-label text-ink-ghost">{item.label}</dt>
                <dd className="mt-2 text-[0.9rem] leading-snug text-ink">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </HeroReveal>

        {/*
          Generated schematic. Deterministic from the study slug, so a given
          project always renders the same figure and nothing here can be
          mistaken for a product screenshot.
        */}
        <HeroReveal delay={0.3} className="mt-12">
          <TechnicalFigure
            kind={study.figure}
            seed={study.slug}
            tone="light"
            classNameOverride="w-full"
          />
        </HeroReveal>
      </Container>
    </Section>
  );
}

function ChallengeSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="challenge-title" className="py-20 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>The challenge</Eyebrow>
            <h2 id="challenge-title" className="display-md max-w-[14ch] text-ink">
              What made this difficult.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
              {study.challenge}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function ConstraintsSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="constraints-title" className="pb-20 md:pb-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Constraints</Eyebrow>
          <h2 id="constraints-title" className="display-md max-w-[20ch] text-ink">
            Non-negotiables we designed around.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2">
          {study.constraints.map((constraint, index) => (
            <RevealItem key={constraint.title}>
              <div className="flex h-full flex-col bg-cream p-7 md:p-8">
                <span className="tech-label text-espresso tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.15rem] leading-snug text-ink">
                  {constraint.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
                  {constraint.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function ApproachSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="approach-title" className="pb-20 md:pb-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Approach</Eyebrow>
          <h2 id="approach-title" className="display-md max-w-[22ch] text-ink">
            How we would build it.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 flex flex-col">
          {study.approach.map((step, index) => (
            <RevealItem key={step.title}>
              <div className="grid gap-3 border-t border-rule-soft py-8 md:grid-cols-[minmax(0,4rem)_minmax(0,1fr)] md:gap-8">
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.65rem] tracking-[0.18em] text-espresso tnum"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[1.15rem] leading-snug text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[0.925rem] leading-relaxed text-ink-muted">
                    {step.body}
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

function ArchitectureSection({ study }: { study: CaseStudy }) {
  return (
    <Section
      labelledBy="architecture-title"
      className="relative isolate overflow-hidden bg-cream py-20 md:py-24"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-55" />

      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>Architecture</Eyebrow>
          <h2 id="architecture-title" className="display-md max-w-[22ch] text-ink">
            How the pieces fit together.
          </h2>
        </div>

        <Reveal delay={0.08} className="mt-12">
          <ArchitectureDiagram
            caption={study.architecture.caption}
            layers={study.architecture.layers}
          />
        </Reveal>
      </Container>
    </Section>
  );
}

function StackSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="stack-title" className="py-20 md:py-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Stack</Eyebrow>
          <h2 id="stack-title" className="display-md max-w-[22ch] text-ink">
            What it would run on.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2">
          {study.stack.map((group) => (
            <RevealItem key={group.group}>
              <div className="h-full bg-cream p-7">
                <h3 className="tech-label text-ink-ghost">{group.group}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-pill border border-rule bg-ivory px-3 py-1.5 text-[0.78rem] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function OutcomesSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="outcomes-title" className="pb-20 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>{study.isConcept ? "Expected outcomes" : "Outcomes"}</Eyebrow>
          <h2 id="outcomes-title" className="display-md max-w-[24ch] text-ink">
            {study.isConcept
              ? "What success would look like."
              : "What we achieved."}
          </h2>
        </div>

        {/*
          Outcome cards are only presented as achieved results for verified work.
          For a concept study the copy and each note state that these are targets,
          so no number on this page can be read as a measured claim.
        */}
        <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2 lg:grid-cols-3">
          {study.outcomes.map((outcome) => (
            <RevealItem key={outcome.label}>
              <div className="flex h-full flex-col bg-cream p-7">
                <p className="tech-label text-ink-ghost">{outcome.label}</p>
                <p
                  className={cn(
                    "mt-5 font-display text-[2rem] leading-none tracking-[-0.02em]",
                    study.isConcept ? "text-espresso" : "text-ink",
                  )}
                >
                  {outcome.value}
                </p>
                <p className="mt-4 text-[0.82rem] leading-relaxed text-ink-faint">
                  {outcome.note}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function LessonsSection({ study }: { study: CaseStudy }) {
  return (
    <Section labelledBy="lessons-title" className="pb-20 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>What we learned</Eyebrow>
          <h2 id="lessons-title" className="display-md max-w-[22ch] text-ink">
            The conclusions we would carry forward.
          </h2>
        </div>

        <RevealGroup className="mt-12 flex flex-col">
          {study.lessons.map((lesson) => (
            <RevealItem key={lesson}>
              <div className="flex gap-4 border-t border-rule-soft py-6">
                <DrawInLine />
                <p className="max-w-[68ch] text-[0.95rem] leading-relaxed text-ink-muted">
                  {lesson}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function RelatedSection({ related }: { related: CaseStudy[] }) {
  if (related.length === 0) {
    return null;
  }

  return (
    <Section labelledBy="related-title" className="pb-24 md:pb-32">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>Related</Eyebrow>
          <h2 id="related-title" className="display-md max-w-[24ch] text-ink">
            Similar problems.
          </h2>
        </div>

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <RevealItem key={item.slug}>
              <Link
                href={`/work/${item.slug}`}
                className="group flex h-full flex-col rounded-card border border-rule-soft bg-cream p-7 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-0.5 hover:border-mocha hover:bg-ivory motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between gap-4">
                  {item.isConcept ? <ConceptBadge /> : <span />}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-ghost transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 text-[1.2rem] leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[0.875rem] leading-relaxed text-ink-muted">
                  {item.summary}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-6">
                  {item.services.map((service) => {
                    const label = getService(service)?.shortTitle ?? service;
                    return (
                      <li
                        key={service}
                        className="text-[0.75rem] text-ink-ghost"
                      >
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.06} className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="lg" arrow>
            Discuss a similar problem
          </ButtonLink>
          <ButtonLink href="/work" variant="outline">
            Back to all projects
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}