import { RailLine, Reveal, RevealItem } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { processStages } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * The four-stage method as a timeline rail.
 *
 * Desktop draws a horizontal rule with a node per stage; below `lg` it becomes
 * a vertical spine. Both renderings come from the same content array so they
 * cannot drift. The rail itself animates its width once on entry.
 */
export function Process() {
  return (
    <Section
      id="process"
      labelledBy="process-title"
      className="relative isolate overflow-hidden bg-cream py-24 md:py-32"
      surface="light"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-50" />

      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="flex flex-col gap-6 md:col-span-7">
            <Eyebrow>02 / How we work</Eyebrow>
            <SplitHeading
              id="process-title"
              lines={["Four stages,", "not four phases."]}
              accentIndex={1}
              className="max-w-[16ch]"
            />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <p className="max-w-[46ch] text-[0.975rem] leading-relaxed text-ink-muted">
              Discovery happens while engineering is already underway, and
              deployment is a stage rather than an afterthought. The rail below
              is the shape of every engagement.
            </p>
          </Reveal>
        </div>

        {/* Horizontal rail */}
        <div className="mt-16 hidden lg:block md:mt-20">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[0.4375rem] h-px bg-rule"
            />
            <RailLine className="absolute top-[0.4375rem] left-0 w-full" />
          </div>

          <ol className="mt-0 grid grid-cols-4">
            {processStages.map((stage) => (
              <RevealItem key={stage.index}>
                <li className="group pr-8">
                  <span
                    aria-hidden="true"
                    className="block size-[0.9375rem] rounded-full border-2 border-mocha bg-ivory transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                  />
                  <div className="mt-8">
                    <span className="tech-label tnum text-espresso">
                      {stage.index}
                    </span>
                    <h3 className="display-sm mt-4 text-ink">{stage.title}</h3>
                    <p className="mt-3 max-w-[30ch] text-[0.875rem] leading-relaxed text-ink-muted">
                      {stage.summary}
                    </p>
                    <p className="mt-4 font-mono text-[0.65rem] leading-relaxed tracking-[0.1em] text-ink-ghost uppercase">
                      {stage.note}
                    </p>
                  </div>
                </li>
              </RevealItem>
            ))}
          </ol>
        </div>

        {/* Vertical spine */}
        <ol className="mt-14 flex flex-col lg:hidden">
          {processStages.map((stage, index) => (
            <Reveal key={stage.index} delay={index * 0.05}>
              <li className="relative flex gap-5 pb-10 last:pb-0">
                <div className="flex flex-col items-center">
                  <span className="tech-label tnum flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-mocha bg-cream text-espresso">
                    {stage.index}
                  </span>
                  {index < processStages.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className={cn("mt-2 w-px flex-1 bg-rule")}
                    />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1 pt-1">
                  <h3 className="display-sm text-ink">{stage.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                    {stage.summary}
                  </p>
                  <p className="mt-3 font-mono text-[0.65rem] leading-relaxed tracking-[0.1em] text-ink-ghost uppercase">
                    {stage.note}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}