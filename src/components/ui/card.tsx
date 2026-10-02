import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Card surfaces. Cream cards stay opaque for readability; glass is reserved
 * for the few surfaces that sit on top of imagery or ambient lighting.
 */
export function Card({
  children,
  className,
  tone = "cream",
  as: Tag = "div",
  interactive = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  tone?: "cream" | "dark" | "glass" | "outline" | "tinted";
  as?: "div" | "article" | "li";
  interactive?: boolean;
} & Record<string, unknown>) {
  const tones: Record<string, string> = {
    cream: "bg-cream text-ink border border-rule",
    dark: "bg-espresso text-cream border border-cream/15",
    glass: "glass text-ink backdrop-blur-xl",
    outline: "border border-rule bg-transparent text-ink",
    tinted: "bg-ivory text-ink border border-rule",
  };

  return (
    <Tag
      data-surface={tone === "dark" ? "dark" : "light"}
      className={cn(
        "relative overflow-hidden rounded-card",
        tones[tone],
        interactive &&
          "transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none hover:border-mocha",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * The brief "Concept study" marker. Rendered on every example project until it
 * is replaced with verified client work — see the warning in case-studies.ts.
 */
export function ConceptBadge({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span
      className={cn(
        "tech-label inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1",
        tone === "dark"
          ? "border-cream/25 bg-cream/10 text-cream/75"
          : "border-mocha/35 bg-mocha/12 text-espresso",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          tone === "dark" ? "bg-cream/70" : "bg-mocha",
        )}
      />
      Concept study
    </span>
  );
}

/** Numbered index used in capability lists and process stages. */
export function IndexMark({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "font-mono text-[0.7rem] tracking-[0.18em] tnum",
        tone === "dark" ? "text-cream/45" : "text-espresso",
        className,
      )}
    >
      {children}
    </span>
  );
}
