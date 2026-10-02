import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { IndexMark } from "@/components/ui/card";
import {
  DrawInLine,
  HeroReveal,
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/ui/reveal";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { ArchitectureDiagram } from "@/components/visuals/architecture-diagram";
import { processStages } from "@/content/process";
import { getService, services, type Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { env } from "@/lib/env";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return { title: "Capability not found" };
  }

  const path = service.href;

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.title} — KAZES.studio`,
      description: service.metaDescription,
      url: path,
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const siblings = services.filter((item) => item.slug !== service.slug);
  const siteUrl = env.siteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    serviceType: service.title,
    url: `${siteUrl}${service.href}`,
    provider: {
      "@type": "Organization",
      name: "KAZES.studio",
      url: siteUrl,
    },
    areaServed: "Worldwide",
  };

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output is escaped for `<` so it cannot terminate the
        // script element early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ServiceHero service={service} />
      <ProblemsSection service={service} />
      <CapabilitiesSection service={service} />
      <ApproachSection service={service} />
      <DeliverablesSection service={service} />
      <DisciplinesSection service={service} />
      <ScenariosSection service={service} />
      <SiblingServices service={service} siblings={siblings} />
      <ServiceCta />
    </>
  );
}

function ServiceHero({ service }: { service: Service }) {
  return (
    <Section
      labelledBy="service-title"
      className="relative isolate overflow-hidden pb-16 md:pb-20"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />
            <Container className="pt-12 md:pt-16">
        <HeroReveal>
          <nav aria-label="Breadcrumb">
            <ol className="tech-label flex flex-wrap items-center gap-2 text-ink-ghost">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-ink"
                >
                  Capabilities
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink-faint">
                {service.shortTitle}
              </li>
            </ol>
          </nav>
        </HeroReveal>

        <HeroReveal delay={0.06} className="mt-10 flex items-center gap-4">
          <IndexMark>{service.index}</IndexMark>
          <Eyebrow>{service.shortTitle}</Eyebrow>
        </HeroReveal>

        <HeroReveal delay={0.12} className="mt-6">
          <h1 id="service-title" className="display-hero max-w-[15ch] text-ink">
            {service.title}
          </h1>
        </HeroReveal>

        <HeroReveal delay={0.18} className="mt-8 max-w-[62ch]">
          <p className="text-[1.0625rem] leading-relaxed text-ink-muted">
            {service.intro}
          </p>
        </HeroReveal>

        <HeroReveal delay={0.24} className="mt-10">
          <ButtonLink href="/contact" size="lg" arrow>
            Discuss your {service.shortTitle.toLowerCase()} project
          </ButtonLink>
        </HeroReveal>
      </Container>
    </Section>
  );
}

function ProblemsSection({ service }: { service: Service }) {
  return (
    <Section labelledBy="problems-title" className="py-20 md:py-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>What we are usually hired for</Eyebrow>
          <h2 id="problems-title" className="display-md max-w-[20ch] text-ink">
            The problems behind the brief.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2">
          {service.problems.map((problem, index) => (
            <RevealItem key={problem.title}>
              <div className="flex h-full flex-col bg-cream p-7 md:p-8">
                <span className="tech-label text-espresso tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-[1.2rem] leading-snug text-ink">
                  {problem.title}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-ink-muted">
                  {problem.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function CapabilitiesSection({ service }: { service: Service }) {
  const dark = service.tint.text === "light";

  return (
    <Section
      surface={dark ? "dark" : "light"}
      labelledBy="capabilities-title"
      className={cn(
        "relative isolate overflow-hidden rounded-t-[2.5rem] py-20 md:py-24",
        dark
          ? "grain bg-gradient-to-br text-cream"
          : "bg-cream text-ink",
      )}
      style={
        dark
          ? {
              background: service.tint.to,
            }
          : undefined
      }
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 hairline-grid",
          dark ? "opacity-30" : "opacity-60",
        )}
      />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow tone={dark ? "dark" : "light"}>Core capabilities</Eyebrow>
            <h2
              id="capabilities-title"
              className={cn("display-md max-w-[16ch]", dark ? "text-cream" : "text-ink")}
            >
              What we do, concretely.
            </h2>
          </Reveal>

          <RevealGroup className="flex flex-col">
            {service.capabilities.map((capability, index) => (
              <RevealItem key={capability}>
                <div
                  className={cn(
                    "flex items-baseline gap-5 border-t py-5",
                    dark ? "border-cream/18" : "border-rule",
                    index === 0 && "border-t-0 pt-0",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "font-mono text-[0.65rem] tracking-[0.18em] tnum",
                      dark ? "text-cream/45" : "text-espresso",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-[1.05rem] leading-snug",
                      dark ? "text-cream" : "text-ink",
                    )}
                  >
                    {capability}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

function ApproachSection({ service }: { service: Service }) {
  return (
    <Section labelledBy="approach-title" className="py-20 md:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <Eyebrow>How we approach it</Eyebrow>
            <h2 id="approach-title" className="display-md max-w-[16ch] text-ink">
              Our method, applied here.
            </h2>
            <p className="max-w-[50ch] text-[0.975rem] leading-relaxed text-ink-muted">
              {service.processFocus}
            </p>

            <ol className="mt-4 flex flex-col">
              {processStages.map((stage, index) => (
                <li key={stage.title} className="border-t border-rule-soft">
                  <div className="flex items-baseline gap-4 py-4">
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.65rem] tracking-[0.18em] text-espresso tnum"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[0.95rem] font-medium text-ink">
                        {stage.title}
                      </p>
                      <p className="mt-0.5 text-[0.82rem] text-ink-faint">
                        {stage.note}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08}>
            <ArchitectureDiagram
              caption={`Layered view of a ${service.shortTitle.toLowerCase()} engagement — interface, integration, infrastructure, operations.`}
              layers={[
                {
                  name: "Interface",
                  items: service.capabilities.slice(0, 3),
                },
                {
                  name: "Integration",
                  items: service.disciplines.slice(0, 3),
                },
                {
                  name: "Infrastructure",
                  items: service.disciplines.slice(3, 6),
                },
                {
                  name: "Operations",
                  items: ["Monitoring", "Runbooks", "Handover"],
                },
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function DeliverablesSection({ service }: { service: Service }) {
  return (
    <Section labelledBy="deliverables-title" className="pb-20 md:pb-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>What you receive</Eyebrow>
          <h2 id="deliverables-title" className="display-md max-w-[20ch] text-ink">
            Deliverables, not status updates.
          </h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((deliverable) => (
            <RevealItem key={deliverable}>
              <div className="flex gap-3 border-t border-rule-soft pt-5">
                <DrawInLine />
                <p className="text-[0.9rem] leading-relaxed text-ink-muted">
                  {deliverable}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function DisciplinesSection({ service }: { service: Service }) {
  return (
    <Section labelledBy="disciplines-title" className="pb-20 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>Disciplines</Eyebrow>
          <h2 id="disciplines-title" className="display-md max-w-[22ch] text-ink">
            The skills we bring to the problem.
          </h2>
        </div>

        <RevealGroup className="mt-10 flex flex-wrap gap-2.5">
          {service.disciplines.map((discipline) => (
            <RevealItem key={discipline}>
              <span className="inline-flex items-center rounded-pill border border-rule bg-cream px-4 py-2.5 text-[0.82rem] text-ink-muted">
                {discipline}
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function ScenariosSection({ service }: { service: Service }) {
  return (
    <Section labelledBy="scenarios-title" className="pb-20 md:pb-24">
      <Container>
        <div className="flex flex-col gap-5">
          <Eyebrow>When this applies</Eyebrow>
          <h2 id="scenarios-title" className="display-md max-w-[22ch] text-ink">
            Where this capability is the answer.
          </h2>
        </div>

        <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft">
          {service.scenarios.map((scenario, index) => (
            <RevealItem key={scenario}>
              <div className="flex items-start gap-5 bg-cream p-6">
                <span
                  aria-hidden="true"
                  className="mt-1 font-mono text-[0.65rem] tracking-[0.18em] text-espresso tnum"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[0.95rem] leading-relaxed text-ink-muted">
                  {scenario}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

function SiblingServices({
  service,
  siblings,
}: {
  service: Service;
  siblings: Service[];
}) {
  return (
    <Section labelledBy="other-title" className="pb-20 md:pb-24">
      <Container>
        <Reveal className="flex flex-col gap-5">
          <Eyebrow>Other capabilities</Eyebrow>
          <h2 id="other-title" className="display-md max-w-[20ch] text-ink">
            The rest of the stack.
          </h2>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
          {siblings.map((sibling) => (
            <RevealItem key={sibling.slug}>
              <Link
                href={sibling.href}
                className="group flex h-full flex-col rounded-card border border-rule-soft bg-cream p-7 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-0.5 hover:border-mocha hover:bg-ivory motion-reduce:transform-none motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="tech-label text-espresso">{sibling.index}</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-ghost transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-espresso motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="mt-6 text-[1.25rem] leading-snug text-ink">
                  {sibling.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.875rem] leading-relaxed text-ink-muted">
                  {sibling.lede}
                </p>
                <span className="mt-auto pt-6 font-mono text-[0.65rem] tracking-[0.12em] text-ink-ghost uppercase">
                  {sibling.capabilities.length} core capabilities
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.06} className="mt-8">
          <p className="text-[0.875rem] text-ink-faint">
            Currently viewing{" "}
            <span className="text-ink-muted">{service.shortTitle}</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

function ServiceCta() {
  return (
    <Section className="pb-24 md:pb-32">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-card bg-espresso px-7 py-14 md:px-14 md:py-20">
            {/* Fixed near-black rather than the per-service tint: this panel
                carries cream type and a `onDark` button, and one service's tint
                is a light grey, which rendered white text on white. It is also
                the page's closing block, so it should match the others. */}
            <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-30" />
            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <h2 className="display-md max-w-[20ch] text-cream">
                  Ready to scope this properly?
                </h2>
                <p className="mt-5 max-w-[52ch] text-[0.95rem] leading-relaxed text-cream/70">
                  Tell us what you are trying to build and where it is stuck. We
                  will come back with a technical read on the problem and a
                  realistic path through it.
                </p>
              </div>

              <ButtonLink href="/contact" variant="onDark" size="lg" arrow>
                Start a conversation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}