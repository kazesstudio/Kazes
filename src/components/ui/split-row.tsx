import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/cn";

/**
 * The core split row: an index or label on one side, prose on the other, with a
 * hairline between. Stacks on small screens. This is the repeating unit the
 * long-form pages are built from, so vertical rhythm stays automatic.
 */
export function SplitRow({
  index,
  label,
  title,
  children,
  aside,
  className,
  tone = "light",
  flip = false,
}: {
  index?: string;
  label?: string;
  title?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  /** Put the text column first. */
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-t py-10 sm:py-14",
        tone === "dark" ? "border-cream/15" : "border-rule",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
        <div
          className={cn(
            "flex items-start justify-between gap-6 md:col-span-4",
            flip && "md:order-2",
          )}
        >
          <div>
            {index ? (
              <span
                className={cn(
                  "tnum tech-label block",
                  tone === "dark" ? "text-cream/40" : "text-ink-ghost",
                )}
              >
                {index}
              </span>
            ) : null}
            {label ? (
              <span
                className={cn(
                  "tech-label mt-3 block",
                  tone === "dark" ? "text-cream" : "text-espresso",
                )}
              >
                {label}
              </span>
            ) : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>

        <div className={cn("md:col-span-8", flip && "md:order-1")}>
          <Reveal>
            {title ? (
              <h3
                className={cn(
                  "display-sm max-w-[24ch]",
                  tone === "dark" ? "text-cream" : "text-ink",
                )}
              >
                {title}
              </h3>
            ) : null}
            {children ? (
              <div
                className={cn(
                  "mt-4 max-w-[62ch] space-y-4 text-[0.9375rem] leading-relaxed",
                  tone === "dark" ? "text-cream/65" : "text-ink-muted",
                )}
              >
                {children}
              </div>
            ) : null}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/** Thin rule used to open a new group of split rows. */
export function RowRule({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full",
        tone === "dark" ? "bg-cream/15" : "bg-rule",
        className,
      )}
    />
  );
}