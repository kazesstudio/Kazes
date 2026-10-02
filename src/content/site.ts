/**
 * Single source of truth for company identity, navigation and contact details.
 *
 * The studio inbox is the one and only contact channel published on this site.
 * There are deliberately no social profiles, no street address, no phone number
 * and no other contact point: nothing here may be invented, and nothing that is
 * not a real, working channel is rendered.
 */

export const siteConfig = {
  name: "KAZES.studio",
  legalName: "KAZES.studio",
  shortName: "KAZES",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kazes.studio").replace(
    /\/$/,
    "",
  ),
  tagline: "Senior engineers, embedded in your team.",
  description:
    "KAZES.studio is a San Francisco engineering startup. We embed senior engineers into teams to design, build and deploy software, AI systems and hardware — inside your repositories and your release process.",
  location: {
    city: "San Francisco",
    region: "CA",
    country: "US",
    countryName: "United States",
  },
  /** "SAN FRANCISCO, CA · WORKING GLOBALLY" */
  locationLine: "San Francisco, CA · Working globally",
  /**
   * The studio inbox, used by the contact form and rendered as a `mailto:`
   * link. This is the only contact address published anywhere on the site.
   *
   * Override with `NEXT_PUBLIC_CONTACT_EMAIL` if the inbox ever changes.
   */
  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contact@kazes.studio",
  /**
   * Set to `false` to render the contact address as an obvious placeholder
   * (for example on a staging deploy before a real inbox is provisioned).
   */
  contactEmailIsLive: true,
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Primary navigation. Mirrored in the mobile drawer. */
export const primaryNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: {
  title: string;
  links: NavItem[];
}[] = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Selected work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Engineering capabilities",
    links: [
      {
        label: "Forward-deployed engineering",
        href: "/services/forward-deployed-engineering",
      },
      { label: "AI & software systems", href: "/services/ai-systems" },
      { label: "Hardware & embedded", href: "/services/hardware" },
      { label: "All capabilities", href: "/services" },
    ],
  },
  {
    title: "Engage",
    links: [
      { label: "Start a project", href: "/contact" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];
