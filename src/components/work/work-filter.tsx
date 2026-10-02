"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { CaseStudyCard } from "@/components/work/case-study-card";
import { caseStudies, workCategories, type WorkCategory } from "@/content/case-studies";
import { cn } from "@/lib/cn";

type Filter = WorkCategory | "all";

/**
 * Case-study index with category filtering.
 *
 * Filtering happens on the client because the whole set is small and shipped
 * with the page. The filter state is reflected in `aria-pressed` on real
 * buttons, and the result count is announced through a polite live region so
 * the change is not visual-only.
 */
export function WorkFilter() {
  const [filter, setFilter] = useState<Filter>("all");
  const reduceMotion = useReducedMotion();

  const visible = useMemo(
    () =>
      filter === "all"
        ? caseStudies
        : caseStudies.filter((study) => study.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", caseStudies.length]]);
    for (const study of caseStudies) {
      map.set(study.category, (map.get(study.category) ?? 0) + 1);
    }
    return map;
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-rule-soft py-5 md:flex-row md:items-center md:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="-mx-1 flex flex-wrap gap-1.5"
        >
          <FilterChip
            active={filter === "all"}
            onClick={() => setFilter("all")}
            count={counts.get("all") ?? 0}
          >
            All
          </FilterChip>

          {workCategories.map((category) => (
            <FilterChip
              key={category.slug}
              active={filter === category.slug}
              onClick={() => setFilter(category.slug)}
              count={counts.get(category.slug) ?? 0}
            >
              {category.label}
            </FilterChip>
          ))}
        </div>

        <p aria-live="polite" className="tech-label shrink-0 text-ink-ghost">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Description of the active filter, so the choice is never ambiguous. */}
      <p className="mt-6 max-w-[52ch] text-[0.9rem] leading-relaxed text-ink-muted">
        {filter === "all"
          ? workCategories[0] && "Every published project, across all four disciplines."
          : workCategories.find((category) => category.slug === filter)?.blurb}
      </p>

      {visible.length === 0 ? (
        <EmptyState onReset={() => setFilter("all")} />
      ) : (
        <motion.ul
          layout={!reduceMotion}
          className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((study) => (
              <motion.li
                key={study.slug}
                layout={!reduceMotion}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <CaseStudyCard study={study} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-pill border px-3.5 py-2 text-[0.78rem] transition-[background-color,border-color,color] duration-300 md:min-h-0",
        active
          ? "border-mocha bg-mocha text-espresso"
          : "border-rule bg-transparent text-ink-muted hover:border-mocha/60 hover:text-ink",
      )}
    >
      {children}
      <span
        className={cn(
          "tnum font-mono text-[0.65rem]",
          active ? "text-espresso/60" : "text-ink-ghost",
        )}
      >
        {count}
      </span>
    </button>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-10 flex flex-col items-start gap-5 rounded-card border border-dashed border-rule bg-transparent p-10">
      <p className="tech-label text-ink-ghost">No projects</p>
      <p className="max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-muted">
        Nothing has been published in this category yet. Verified work in this
        discipline will appear here as it is cleared for release.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="text-[0.82rem] font-medium text-ink underline underline-offset-4"
      >
        Show all projects
      </button>
    </div>
  );
}
