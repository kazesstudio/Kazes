import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container, Eyebrow, Section } from "@/components/ui/section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist on kazes.studio.",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  { label: "Home", href: "/", note: "What we do and how we work." },
  { label: "Services", href: "/services", note: "Three engineering capabilities." },
  { label: "Work", href: "/work", note: "Concept studies, written up in full." },
  { label: "Contact", href: "/contact", note: "Start a conversation." },
];

export default function NotFoundPage() {
  return (
    <Section labelledBy="notfound-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 hairline-grid opacity-45" />
      

      <Container className="pt-20 pb-24 md:pt-28 md:pb-32">
        <Eyebrow>Error 404</Eyebrow>

        <h1 id="notfound-title" className="display-hero mt-8 max-w-[16ch] text-ink">
          This page isn&rsquo;t here.
        </h1>

        <p className="mt-8 max-w-[52ch] text-[1.0625rem] leading-relaxed text-ink-muted">
          The link may be out of date, or the page may have moved. Everything
          below is a better place to start.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline" size="lg">
            Contact us
          </ButtonLink>
        </div>

        <nav aria-label="Suggested pages" className="mt-20 border-t border-rule-soft pt-10">
          <p className="tech-label text-ink-ghost">Try one of these</p>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-card border border-rule-soft bg-rule-soft sm:grid-cols-2">
            {DESTINATIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full items-start justify-between gap-4 bg-cream p-6 transition-colors hover:bg-ivory"
                >
                  <span>
                    <span className="block text-[1.05rem] text-ink">{item.label}</span>
                    <span className="mt-1 block text-[0.82rem] text-ink-faint">
                      {item.note}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-ghost transition-[transform,color] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-espresso motion-reduce:transition-none"
                    strokeWidth={1.5}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-16 border-t border-rule-soft pt-8">
          <p className="tech-label text-ink-ghost">Engineering capabilities</p>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.href}
                  className="text-[0.9rem] text-ink-muted underline decoration-rule underline-offset-4 transition-colors hover:text-ink hover:decoration-mocha"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}