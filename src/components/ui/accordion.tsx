"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

export type AccordionItem = {
  index: string;
  question: string;
  answer: ReactNode;
};

/**
 * Numbered disclosure list.
 *
 * Uses native `<button aria-expanded>` rather than `<details>` because the
 * height animation needs a measured element. Only one panel is open at a time,
 * which keeps the section readable at a glance. Opening and closing are both
 * animated, and both are suppressed under reduced motion.
 */
export function Accordion({
  items,
  className,
  tone = "light",
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  className?: string;
  tone?: "light" | "dark";
  /** Pass `null` to start fully collapsed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "border-t",
        tone === "dark" ? "border-cream/15" : "border-rule",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.index}
            className={cn(
              "border-b",
              tone === "dark" ? "border-cream/15" : "border-rule",
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  "group flex w-full items-start gap-5 py-6 text-left transition-colors duration-300 motion-reduce:transition-none sm:gap-8 sm:py-7",
                  tone === "dark"
                    ? "hover:text-cream"
                    : "hover:text-espresso",
                )}
              >
                <span
                  className={cn(
                    "tnum tech-label mt-2 shrink-0 transition-colors duration-300 motion-reduce:transition-none",
                    isOpen
                      ? tone === "dark"
                        ? "text-cream"
                        : "text-espresso"
                      : tone === "dark"
                        ? "text-cream/40"
                        : "text-ink-ghost",
                  )}
                >
                  {item.index}
                </span>
                <span className="flex-1 font-sans text-[1.0625rem] font-medium tracking-[-0.02em] sm:text-[1.25rem]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 flex size-6 shrink-0 items-center justify-center sm:size-7",
                    "transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    isOpen && "rotate-45",
                    tone === "dark"
                      ? "text-cream/70"
                      : "text-ink-faint group-hover:text-espresso",
                  )}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-full"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  >
                    <path d="M8 1.5v13" />
                    <path d="M1.5 8h13" />
                  </svg>
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div
                    className={cn(
                      "max-w-[64ch] pb-8 pl-0 text-[0.9375rem] leading-relaxed sm:pb-10 sm:pl-[3.25rem]",
                      tone === "dark" ? "text-cream/65" : "text-ink-muted",
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}