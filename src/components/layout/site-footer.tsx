import Link from "next/link";

import { footerNav, siteConfig } from "@/content/site";

import { ContactEmailLink } from "./contact-email";
import { Wordmark } from "./wordmark";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer
      data-surface="dark"
      className="relative isolate overflow-hidden bg-espresso text-cream"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.5] hairline-grid"
      />
            

      <div className="shell pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-6">
            {/* The footer is a near-black block, so the logo inverts to white
                here while the header and the white ground use the black one. */}
            <Wordmark tone="light" size="lg" />
            <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-cream/70">
              A San Francisco engineering startup. We embed senior engineers
              into ambitious teams to design, build, and deploy software, AI
systems, and hardware.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 sm:grid-cols-3"
          >
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="tech-label text-cream/40">
                  {group.title}
                </h2>
                <ul className="mt-2 flex flex-col">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.href}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="inline-flex min-h-11 items-center text-[0.9rem] text-cream/80 underline-offset-4 transition-colors duration-200 hover:text-cream hover:underline md:min-h-0"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="tech-label text-cream/40">Direct</span>
            <ContactEmailLink tone="dark" className="text-[0.95rem]" />
          </div>

          <p className="tech-label text-cream/35 md:text-right">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
