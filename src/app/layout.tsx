import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";
import { env } from "@/lib/env";

import "./globals.css";

/**
 * An editorial pairing rather than a single family: Fraunces sets the display
 * voice, Geist handles interface and body copy, and Geist Mono carries the
 * technical annotations. Both are variable fonts, so the display face covers a
 * wide weight range in one file.
 *
 * Note the token names — the next/font variables are deliberately kept distinct
 * from the `@theme` token names in globals.css, which point at them.
 */
const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["Georgia", "ui-serif", "serif"],
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

const siteUrl = env.siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "KAZES.studio — San Francisco engineering startup",
    template: "%s — KAZES.studio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteUrl }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: siteUrl,
    title: "KAZES.studio — We engineer what comes next.",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "KAZES.studio — We engineer what comes next.",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
  colorScheme: "light",
};

/**
 * Organization + ProfessionalService structured data.
 *
 * Only facts we can actually assert are included. No aggregate rating, no
 * founding date, no telephone number, and no address — a street address is
 * omitted rather than guessed, since an invented postal address in structured
 * data is a direct liability.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.name,
      legalName: siteConfig.legalName,
      url: siteUrl,
      logo: `${siteUrl}/icon.svg`,
      description: siteConfig.description,
      slogan: siteConfig.tagline,
      email: siteConfig.contactEmailIsLive ? siteConfig.contactEmail : undefined,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteUrl,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      areaServed: "Worldwide",
      serviceType: [
        "Forward-deployed engineering",
        "Artificial intelligence engineering",
        "Custom software development",
        "Embedded and hardware engineering",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Engineering capabilities",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.metaDescription,
            url: `${siteUrl}${service.href}`,
          },
        })),
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-ink antialiased">
        <JsonLd data={organizationJsonLd} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
