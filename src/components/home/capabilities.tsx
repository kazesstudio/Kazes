import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { SplitRow } from "@/components/ui/split-row";
import { SplitHeading } from "@/components/ui/split-heading";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { services } from "@/content/services";
import { cn } from "@/lib/cn";

/**
 * Capabilities as index-driven split rows rather than a card grid. The rhythm
 * matches the rest of the long-form page: hairline, index on the left, prose on
 * the right, alternating which column leads on wider screens.
 */
export function Capabilities() {
  return (
    <Section
      id="capabilities"
      labelledBy="capabilities-title"
      className="py-24 md:py-32"
    >
      <Container>
        <Reveal className="flex flex-col gap-6">
          <Eyebrow>01 / Engineering capabilities</Eyebrow>
          <SplitHeading
            id="capabilities-title"
            lines={["Three disciplines.", "One team."]}
            accentIndex={1}
            className="max-w-[16ch]"
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-8 max-w-[52ch]">
          <p className="text-[0.975rem] leading-relaxed text-ink-muted">
            Most problems we are handed cross at least two of these, so we staff
            across the stack rather than handing you off at the seam. Each row
            below opens into the detail of what that discipline actually covers.
          </p>
        </Reveal>

        <div className="mt-16 border-b border-rule md:mt-20">
          {services.map((service, index) => (
            <SplitRow
              key={service.slug}
              index={service.index}
              label={service.shortTitle}
              title={service.title}
              flip={index % 2 === 1}
              aside={
                <Link
                  href={service.href}
                  className={cn(
                    "group/link inline-flex min-h-11 items-center gap-2 text-[0.8rem] font-medium text-ink transition-colors hover:text-espresso md:min-h-0",
                  )}
                >
                  Explore
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="size-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 motion-reduce:transition-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  >
                    <path d="M3.2 8.8 8.8 3.2" />
                    <path d="M4.6 3.2h4.2v4.2" />
                  </svg>
                </Link>
              }
            >
              <p>{service.lede}</p>
              <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {service.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2.5 text-[0.875rem] leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.5em] size-1 shrink-0 rounded-full bg-mocha"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </SplitRow>
          ))}
        </div>
      </Container>
    </Section>
  );
}