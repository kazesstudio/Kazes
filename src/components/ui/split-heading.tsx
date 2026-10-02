"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/cn";

/**
 * Oversized display heading whose lines rise out of a clipping mask.
 *
 * `lines` is an array of strings so each line can be masked independently —
 * wrapping a single string would clip mid-word. `accent` marks a word that
 * should carry the accent colour, chosen by the caller via `accentIndex`.
 */
export function SplitHeading({
  lines,
  accentIndex,
  as: Tag = "h2",
  className,
  tone = "light",
  delay = 0,
  id,
  once = true,
  amount = 0.4,
}: {
  lines: string[];
  /** Which line renders in the accent colour. */
  accentIndex?: number;
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "light" | "dark";
  delay?: number;
  id?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();
  const base = cn(
    "display-lg",
    tone === "dark" ? "text-cream" : "text-ink",
    className,
  );
  // The accent line is brushed with the metallic gradient on light surfaces and
  // lifted to a brighter gold on dark ones.
  const accentClass =
    "gold-text";

  if (reduceMotion) {
    return (
      <Tag id={id} className={base}>
        {lines.map((line, index) => (
          <span
            key={line}
            className={cn("block", index === accentIndex && accentClass)}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag id={id} className={base}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={cn("block", index === accentIndex && accentClass)}
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, amount }}
            transition={{
              duration: 1,
              delay: delay + index * 0.09,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * A heading with one word wrapped in braces — the bracketed phrase gets a
 * subtle outline treatment that inverts on hover. Purely presentational.
 */
export function BracketedHeading({
  before,
  bracketed,
  after,
  as: Tag = "h2",
  className,
  tone = "light",
}: {
  before: string;
  bracketed: string;
  after?: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Tag
      className={cn(
        "display-lg",
        tone === "dark" ? "text-cream" : "text-ink",
        className,
      )}
    >
      {before}{" "}
      <span className="relative inline-block">
        <motion.span
          className="relative z-10 inline-block px-1"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {bracketed}
        </motion.span>
        <motion.span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 -z-0 rounded-[4px]",
            tone === "dark" ? "bg-cream/12" : "bg-mocha/12",
          )}
          initial={reduceMotion ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </span>
      {after ? <> {after}</> : null}
    </Tag>
  );
}

/**
 * Section eyebrow that counts itself up to a given value. Used for the numbered
 * rows, where the reference rhythm is index-driven rather than card-driven.
 */
export function TickerNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <span className={cn("tnum tech-label", className)} aria-hidden="true">
      {value}
    </span>
  );
}