import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/ui/split-heading";
import { ContactEmailLink } from "@/components/layout/contact-email";
import { HeroReveal } from "@/components/ui/reveal";
import { siteConfig } from "@/content/site";

/** Flush, hairline-separated strip. Static type rather than a moving band. */
const DISCIPLINES = [
  { code: "SW", label: "Software systems" },
  { code: "AI", label: "Applied AI" },
  { code: "HW", label: "Hardware & embedded" },
];

/**
 * Editorial masthead. Asymmetric: the display line sets in a narrow measure on
 * the left, the standfirst and a direct contact line sit in a right-hand
 * column. Deliberately not a centred banner with a row of buttons.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-24 md:pt-28"
    >
      <div aria-hidden="true" className="ambient">
        <div className="absolute inset-0 hairline-grid opacity-50" />
      </div>

      <div className="shell relative">
        {/* Masthead rule */}
        <HeroReveal delay={0.04}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-rule pb-3">
            <p className="tech-label text-ink-faint">
              {siteConfig.locationLine}
            </p>
            <p className="tech-label text-ink-faint">
              Engineering startup — {new Date().getFullYear()}
            </p>
          </div>
        </HeroReveal>

        <div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-20">
          <div className="md:col-span-7">
            <HeroReveal delay={0.1}>
              <SplitHeading
                id="hero-title"
                as="h1"
                lines={["We embed", "senior engineers", "into your team."]}
                accentIndex={1}
                className="display-hero max-w-[13ch]"
                once={false}
                amount={0.2}
              />
            </HeroReveal>
          </div>

          <div className="flex flex-col justify-end md:col-span-5 md:pl-6">
            <HeroReveal delay={0.2}>
              <p className="max-w-[42ch] border-l border-gold pl-5 text-[1.0625rem] leading-relaxed text-ink-muted">
                KAZES.studio designs, builds and deploys software, AI systems
                and hardware — inside your repositories, inside your release
                process, and handed over documented so your team can run all of
                it without us.
              </p>
            </HeroReveal>

            <HeroReveal delay={0.28} className="mt-8 flex items-center gap-6">
              <ButtonLink href="/contact" size="lg" arrow>
                Start a project
              </ButtonLink>
              <Link
                href="/work"
                className="group/link inline-flex min-h-11 items-center gap-1.5 text-[0.875rem] font-medium text-ink underline-offset-4 transition-colors hover:text-espresso md:min-h-0"
              >
                Selected work
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                >
                  →
                </span>
              </Link>
            </HeroReveal>

            <HeroReveal delay={0.34} className="mt-8">
              <div className="border-t border-rule pt-4">
                <p className="tech-label text-ink-ghost">Direct</p>
                <ContactEmailLink className="mt-2 text-[0.9rem]" />
              </div>
            </HeroReveal>
          </div>
        </div>

        {/* Contents strip */}
        <HeroReveal delay={0.4}>
          <ul className="grid grid-cols-1 border-t border-rule sm:grid-cols-3">
            {DISCIPLINES.map((item) => (
              <li
                key={item.code}
                className="flex items-baseline gap-4 border-b border-rule py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <span className="tech-label text-espresso">{item.code}</span>
                <span className="font-display text-[1.125rem] tracking-[-0.01em] text-ink">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </HeroReveal>
      </div>
    </section>
  );
}