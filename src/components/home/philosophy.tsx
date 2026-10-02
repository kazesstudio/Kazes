import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { SplitRow } from "@/components/ui/split-row";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { SystemMap } from "@/components/visuals/system-map";

const PRINCIPLES = [
  {
    title: "Direct collaboration",
    body: "We work with the people who own the problem, not a proxy for them. Engineers talk to operators, and decisions get made by the team that will live with them.",
  },
  {
    title: "Practical implementation",
    body: "A working slice in your environment beats a complete proposal. We would rather show you something running on Monday than something perfect in a month.",
  },
  {
    title: "Architecture that ages well",
    body: "We design for the team that maintains it two years from now — a team we will probably never meet. That constraint does most of the work for you.",
  },
  {
    title: "Rapid, honest feedback",
    body: "Short cycles and direct reporting. If something is not working we say so early, when it is still cheap to change.",
  },
  {
    title: "Built to be handed over",
    body: "Documented decisions, runbooks, and a working handover conversation. Leaving your team able to operate what we built is part of the deliverable.",
  },
];

/**
 * Engineering philosophy. An inverted statement panel anchored beside the principle
 * list, then the principles themselves as split rows so they inherit the same
 * rhythm as the capabilities section above.
 */
export function Philosophy() {
  return (
    <Section labelledBy="philosophy-title" className="py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div>
            <Reveal className="flex flex-col gap-6">
              <Eyebrow>04 / Engineering philosophy</Eyebrow>
              <SplitHeading
                id="philosophy-title"
                lines={["Close to the", "problem."]}
                accentIndex={1}
                className="max-w-[16ch]"
              />
              <p className="max-w-[54ch] text-[1rem] leading-relaxed text-ink-muted">
                Distance is expensive. It shows up as a recommendation nobody
                can implement, a system that does not match how the work is
                actually done, and a handover nobody is ready for. We stay close
                instead — to the code, to the operations, and to the people who
                will run what we build.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <SystemMap className="mx-auto w-full max-w-[30rem] lg:hidden" />
            </Reveal>
          </div>

          {/* Inverted statement panel — desktop only. */}
          <Reveal
            delay={0.1}
            className="hidden lg:flex lg:items-start lg:justify-end"
          >
            <div className="relative sticky top-28 w-full max-w-[26rem] overflow-hidden rounded-card bg-espresso p-8 text-cream shadow-lift">
              <div
                aria-hidden="true"
                className="absolute inset-0 hairline-grid opacity-70"
              />
                            <div className="relative">
                <p className="tech-label text-cream/50">System map</p>
                <p className="mt-4 font-display text-[1.6rem] leading-snug text-cream">
                  One team, from silicon to interface.
                </p>
                <p className="mt-4 text-[0.85rem] leading-relaxed text-cream/70">
                  The disciplines overlap. A latency problem is usually a data
                  problem is usually a firmware problem. We staff so that
                  question has one owner.
                </p>

                <SystemMap tone="dark" className="mt-8" />

                <p
                  aria-hidden="true"
                  className="gold-rule mt-8 h-px w-full opacity-60"
                />
                <p className="mt-5 font-mono text-[0.65rem] leading-relaxed tracking-[0.12em] text-cream/45 uppercase">
                  Hardware · Infrastructure · Intelligence · Software
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-20 border-b border-rule md:mt-24">
          {PRINCIPLES.map((principle, index) => (
            <SplitRow
              key={principle.title}
              index={String(index + 1).padStart(2, "0")}
              label="Principle"
              title={principle.title}
              flip={index % 2 === 1}
            >
              <p>{principle.body}</p>
            </SplitRow>
          ))}
        </div>
      </Container>
    </Section>
  );
}