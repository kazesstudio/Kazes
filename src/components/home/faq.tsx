import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SplitHeading } from "@/components/ui/split-heading";
import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { faqItems } from "@/content/faq";

/**
 * Straight answers to the questions people actually ask before starting an
 * engagement. Answers are deliberately candid where the honest answer is "it
 * depends" — see the note in `src/content/faq.ts`.
 */
export function Faq() {
  return (
    <Section
      id="faq"
      labelledBy="faq-title"
      className="relative isolate overflow-hidden py-24 md:py-32"
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <Reveal className="flex flex-col gap-6">
                <Eyebrow>05 / Before you enquire</Eyebrow>
                <SplitHeading
                  id="faq-title"
                  lines={["Straight", "answers."]}
                  accentIndex={1}
                  className="max-w-[12ch]"
                />
                <p className="max-w-[40ch] text-[0.975rem] leading-relaxed text-ink-muted">
                  If your question is not here, ask it directly. We would
                  rather have the awkward conversation early than three weeks
                  into an engagement.
                </p>
                <ButtonLink href="/contact" variant="outline" arrow>
                  Ask us something
                </ButtonLink>
              </Reveal>
            </div>
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <Accordion
                items={faqItems.map((item) => ({
                  index: item.index,
                  question: item.question,
                  answer: <p>{item.answer}</p>,
                }))}
                defaultOpen={0}
              />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Colophon strip — static type, hairline-ruled. */}
      <div className="mt-20 border-t border-rule md:mt-28">
        <dl className="grid grid-cols-1 sm:grid-cols-3">
          {[
            { term: "Focus", detail: "Software, AI systems, hardware" },
            { term: "Working", detail: "Globally, remote-first" },
            { term: "Engagements", detail: "Senior engineers only" },
          ].map((item) => (
            <div
              key={item.term}
              className="border-b border-rule py-6 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <dt className="tech-label text-ink-ghost">{item.term}</dt>
              <dd className="mt-3 font-display text-[1.125rem] tracking-[-0.01em] text-ink">
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}