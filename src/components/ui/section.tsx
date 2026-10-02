import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Section shell. Handles the horizontal gutter and the `data-surface` hook the
 * base layer uses to invert focus rings and hairlines on dark backgrounds.
 */
export function Section({
  as: Tag = "section",
  id,
  className,
  children,
  surface = "light",
  labelledBy,
  ...rest
}: {
  as?: ElementType;
  id?: string;
  className?: string;
  children: ReactNode;
  surface?: "light" | "dark";
  labelledBy?: string;
} & Record<string, unknown>) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      data-surface={surface}
      className={cn("relative isolate", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: ReactNode;
  size?: "default" | "wide" | "narrow";
}) {
  return (
    <div
      className={cn(
        "shell",
        size === "wide" && "!max-w-[94rem]",
        size === "narrow" && "!max-w-[52rem]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small uppercase mono label with a leading rule. */
export function Eyebrow({
  children,
  className,
  tone = "light",
  rule = true,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  rule?: boolean;
}) {
  return (
    <p
      className={cn(
        "tech-label flex items-center gap-3",
        tone === "dark" ? "text-cream/60" : "text-ink-faint",
        className,
      )}
    >
      {rule ? (
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-8",
            tone === "dark" ? "bg-cream/30" : "bg-mocha/50",
          )}
        />
      ) : null}
      {children}
    </p>
  );
}

/** Section heading block: eyebrow + serif title + optional lede. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "light",
  align = "start",
  className,
  titleId,
  as: TitleTag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  titleId?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <TitleTag
        id={titleId}
        className={cn(
          "display-lg max-w-[18ch]",
          align === "center" && "max-w-[22ch]",
          tone === "dark" ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </TitleTag>
      {lede ? (
        <p
          className={cn(
            "max-w-[52ch] text-[0.975rem] leading-relaxed",
            tone === "dark" ? "text-cream/70" : "text-ink-muted",
          )}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}

/** Consistent vertical rhythm between top-level page sections. */
export function SectionStack({
  className,
  children,
  ...rest
}: { className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <div className={cn("flex flex-col", className)} {...rest}>
      {children}
    </div>
  );
}
