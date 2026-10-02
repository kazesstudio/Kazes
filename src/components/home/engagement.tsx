import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { engagementModels } from "@/content/process";
import { cn } from "@/lib/cn";

/**
 * Engagement models.
 *
 * Deliberately no pricing. Scope, seniority, and duration determine cost, and
 * publishing invented figures would misrepresent how these engagements work.
 */
export function Engagement() {
  return (
    <Section
      id="engagement"
      labelledBy="engagement-title"
      surface="dark"
      className="relative isolate overflow-hidden bg-espresso py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hairline-grid opacity-60"
      />
      

      <Container>
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <Reveal className="flex flex-col gap-6 md:col-span-7">
            <Eyebrow tone="dark">06 / Ways to work together</Eyebrow>
            <SplitHeading
              id="engagement-title"
              lines={["Flexible shapes,", "one standard."]}
              accentIndex={1}
              tone="dark"
              className="max-w-[16ch]"
            />
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-5">
            <p className="max-w-[42ch] text-[0.975rem] leading-relaxed text-cream/65">
              Every engagement is scoped around a technical objective. We do not
              publish fixed pricing because the cost depends on the problem, not
              on a rate card.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-px bg-cream/12 sm:grid-cols-2">
          {engagementModels.map((model, index) => (
            <RevealItem key={model.title}>
              <article className="group relative flex h-full flex-col bg-espresso p-7 transition-colors duration-500 hover:bg-chocolate/50 md:p-8">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 motion-reduce:transition-none"
                />

                <div className="flex items-baseline justify-between gap-4">
                  <span className="tech-label tnum text-cream/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="tech-label text-cream/30">{model.shape}</span>
                </div>

                <h3 className="display-sm mt-7 text-cream">{model.title}</h3>

                <p className="mt-3 text-[0.9rem] leading-relaxed text-cream/80">
                  {model.summary}
                </p>

                <p className="mt-4 text-[0.85rem] leading-relaxed text-cream/55">
                  {model.body}
                </p>

                <p
                  className={cn(
                    "mt-auto pt-7 font-mono text-[0.65rem] leading-relaxed tracking-[0.1em] uppercase",
                    "text-cream/40",
                  )}
                >
                  Best for — {model.bestFor}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal
          delay={0.08}
          className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-[46ch] text-[0.9rem] leading-relaxed text-cream/60">
            Not sure which shape fits? Start with technical discovery. It is
            short, it is decision-oriented, and you keep the roadmap either
            way.
          </p>
          <ButtonLink href="/contact" variant="onDark" size="lg" arrow>
            Discuss scope
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}