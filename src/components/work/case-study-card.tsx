import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card, ConceptBadge } from "@/components/ui/card";
import { workCategories, type CaseStudy } from "@/content/case-studies";
import { cn } from "@/lib/cn";

export function categoryLabel(slug: string): string {
  return (
    workCategories.find((category) => category.slug === slug)?.label ?? slug
  );
}

export function serviceShortLabel(slug: string): string {
  const labels: Record<string, string> = {
    "forward-deployed-engineering": "Forward-deployed",
    "ai-systems": "AI systems",
    hardware: "Hardware",
  };
  return labels[slug] ?? slug;
}

/**
 * Case-study card. The same component backs the homepage preview, the /work
 * index, and related-project lists, so a card can never render differently
 * depending on where it appears.
 */
export function CaseStudyCard({
  study,
  tone = "light",
  className,
  showFigureGlyph = true,
}: {
  study: CaseStudy;
  tone?: "light" | "dark";
  className?: string;
  showFigureGlyph?: boolean;
}) {
  const dark = tone === "dark";
  const href = `/work/${study.slug}`;

  return (
    <Card
      as="article"
      tone={dark ? "dark" : "cream"}
      interactive
      className={cn("kz-sweep flex h-full flex-col p-6 md:p-7", className)}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "tech-label",
            dark ? "text-cream" : "text-espresso",
          )}
        >
          {categoryLabel(study.category)}
        </span>
        {study.isConcept ? (
          <ConceptBadge tone={dark ? "dark" : "light"} />
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-6 text-[1.35rem] leading-snug md:text-[1.45rem]",
          dark ? "text-cream" : "text-ink",
        )}
      >
        {/* Whole card is clickable via a stretched link, but only the heading
            is in the accessibility tree as the link name. */}
        <Link
          href={href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          <span className="bg-gradient-to-r from-current to-current bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            {study.title}
          </span>
        </Link>
      </h3>

      <p
        className={cn(
          "mt-4 text-[0.875rem] leading-relaxed",
          dark ? "text-cream/65" : "text-ink-muted",
        )}
      >
        {study.summary}
      </p>

      {showFigureGlyph ? (
        <div className="mt-7 flex h-24 items-end gap-1.5" aria-hidden="true">
          <FigureGlyph study={study} dark={dark} />
        </div>
      ) : null}

      <div
        className={cn(
          "mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5",
          dark ? "border-cream/12" : "border-rule-soft",
        )}
      >
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1.5">
            <dt className="tech-label sr-only">Year</dt>
            <dd
              className={cn(
                "font-mono text-[0.7rem] tracking-[0.1em] tnum",
                dark ? "text-cream/50" : "text-ink-ghost",
              )}
            >
              {study.year}
            </dd>
          </div>
          {study.services.map((service) => (
            <div key={service} className="flex items-center gap-1.5">
              <dt className="sr-only">Capability</dt>
              <dd
                className={cn(
                  "text-[0.75rem]",
                  dark ? "text-cream/50" : "text-ink-faint",
                )}
              >
                {serviceShortLabel(service)}
              </dd>
            </div>
          ))}
        </dl>

        <span
          className={cn(
            "ml-auto inline-flex items-center gap-1 text-[0.78rem] font-medium",
            dark ? "text-cream" : "text-ink",
          )}
        >
          Read
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 motion-reduce:transition-none"
            strokeWidth={1.5}
          />
        </span>
      </div>
    </Card>
  );
}

/**
 * Deterministic bar glyph standing in for a case-study figure. Derived from the
 * study slug so each project keeps its own signature, and unmistakably a mark
 * rather than a fabricated screenshot.
 */
function FigureGlyph({ study, dark }: { study: CaseStudy; dark: boolean }) {
  let state = 2166136261;
  for (let index = 0; index < study.slug.length; index += 1) {
    state ^= study.slug.charCodeAt(index);
    state = Math.imul(state, 16777619);
  }
  state >>>= 0;

  const bars: number[] = [];
  for (let index = 0; index < 28; index += 1) {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >> 17;
    state ^= state << 5;
    state >>>= 0;
    const value = state / 0xffffffff;
    // Envelope: a soft arch, so the glyph reads as a signal trace.
    const envelope = Math.sin((index / 27) * Math.PI) * 0.75 + 0.25;
    bars.push(Math.max(0.12, value * envelope));
  }

  return (
    <>
      {bars.map((value, index) => (
        <span
          key={index}
          className={cn(
            "flex-1 rounded-full",
            dark ? "bg-cream/25" : "bg-mocha/30",
          )}
          style={{
            height: `${Math.round(value * 100)}%`,
            backgroundColor:
              index % 7 === 3
                ? dark
                  ? "#d4ff3f"
                  : "#0a0a0a"
                : undefined,
          }}
        />
      ))}
    </>
  );
}
