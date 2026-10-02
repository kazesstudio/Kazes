"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Scroll-triggered reveal.
 *
 * Motion is suppressed entirely when the visitor has asked for reduced motion:
 * the element renders in its final state with no transform and no transition.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.7,
  once = true,
  amount = 0.35,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Staggered container. Pair with `RevealItem` children.
 */
export function RevealGroup({
  children,
  className,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={listVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * Heading-level entrance used for hero copy. Runs on mount rather than on
 * scroll, so the first paint is never gated on an intersection.
 */
export function HeroReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A horizontal rule that draws itself from the left as it enters the viewport.
 * Sits behind timeline nodes. Decorative only.
 */
export function RailLine({
  className,
  duration = 1.4,
}: {
  className?: string;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-px w-full bg-mocha", className)}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px origin-left bg-mocha", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/**
 * A hairline that draws itself in. Decorative only — hidden from assistive
 * technology so it is never announced as content.
 */
export function DrawInLine({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn("h-px w-full bg-current opacity-15", className)}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-px w-full origin-left bg-current opacity-15", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
