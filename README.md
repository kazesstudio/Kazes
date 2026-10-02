# KAZES.studio

Marketing site for KAZES.studio — a San Francisco engineering startup delivering
forward-deployed engineering, AI & software systems, and hardware & embedded
engineering.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind
CSS v4, Framer Motion, and a small Three.js scene.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site runs at <http://localhost:3000> with **no configuration at all**. Every
environment variable is optional, and the site degrades honestly when one is
missing — see [Configuration](#configuration).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Turbopack dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`, flat config) |
| `npx tsc --noEmit` | Type check only |

## Content model

All copy and project data lives in `src/content`. No CMS is wired up — these
modules are the single source of truth and are typed, so the service index,
service detail pages, navigation, footer, sitemap, and JSON-LD all read from one
place.

| Module | Drives |
| --- | --- |
| `src/content/site.ts` | Identity, nav, location, contact email config |
| `src/content/services.ts` | `/services` index and the three detail pages |
| `src/content/case-studies.ts` | `/work` index and the case-study detail pages |
| `src/content/process.ts` | The four-stage method and engagement models |

### Adding a service

Append an entry to `services` in `src/content/services.ts`. The route, the nav
listing, the footer links, and the sitemap pick it up automatically.

### Adding a project

Append an entry to `caseStudies` in `src/content/case-studies.ts`.

> **Before publishing anything as real work, read the banner at the top of
> `case-studies.ts`.**

## Concept studies vs. verified work

Every project currently published is a **concept study** (`isConcept: true`):
a full technical write-up describing how we would approach a problem. They are
not client engagements.

This distinction is enforced in the UI, not just documented:

- A `Concept study` badge renders on the work index, the cards, and the detail
  page.
- Outcome figures are labelled *expected outcomes*, not results, and each one
  carries a note saying it is a target rather than a measurement.
- `/terms` states plainly that no figure on the site is a performance claim.
- `isConcept: true` drives the `CreativeWork` JSON-LD, which deliberately omits
  any client or provider claim.

To publish verified work, set `isConcept: false`, add the client name (or keep
`client: null` with `clientDisclosed: false` for NDA work). The badges and the
"expected" framing disappear automatically.

## Configuration

Every key is optional. See `.env.example` for the annotated list.

### Contact delivery

The inquiry form is a server action (`src/app/actions/inquiry.ts`) with two
delivery paths:

1. **Email via Resend** — set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and
   `CONTACT_FROM_EMAIL` (the from-address must be on a verified domain).
2. **Webhook** — set `CONTACT_WEBHOOK_URL`. The inquiry arrives as JSON, so
   leads can be routed into a CRM or an internal queue instead of an inbox.

If neither is configured, the form returns an honest error telling the visitor
to email instead. It **never** reports a false success.

`CONTACT_LOG_ONLY=1` writes submissions to the server console instead of
delivering them. This is for local development and preview deploys. It also
never reports success, so it is safe on a preview, but nothing is delivered — do
not use it in production.

### Contact address

The studio inbox is the **only** contact channel published on this site. There
are no social profiles, no street address and no phone number anywhere in the
codebase — those fields and their environment variables were removed rather than
left as empty placeholders.

`src/content/site.ts` ships the live inbox `contact@kazes.studio`, overridable
with `NEXT_PUBLIC_CONTACT_EMAIL`. `src/components/layout/contact-email.tsx` is
the single guarded renderer: it is the only place a `mailto:` link is built, so
every mention of the inbox on the site routes through it. Setting
`contactEmailIsLive` to `false` (for example on a staging deploy) degrades it to
an explicit, non-clickable placeholder instead of advertising an address that
does not exist.

### Security

- `CONTACT_RATE_LIMIT_SALT` — salts the IP hashing used for rate limiting.
  Generate with `openssl rand -hex 32`.
- `CONTACT_FORM_KEY` — when set, submissions must carry a matching
  `x-kazes-form-key` header.
- Rate limiting is in-memory and therefore per-instance. On a multi-instance
  deployment, put a shared store in front of it or rely on your platform's edge
  limits.

### Anti-spam

Three layers, all on the server: a honeypot field, a completion-timing check
(`form_started_at`, stamped on first interaction), and IP rate limiting. The
honeypot only rejects when combined with another bot signal, so an aggressive
password manager that fills a hidden field on a genuine, slow submission is not
locked out.

## Design system

The site is **white-first**. The page ground is white and the near-black
blocks are held back for the lower part of each page, so a route reads light at
the top and turns black as it ends. Tokens live in `src/app/globals.css` under
Tailwind v4's `@theme`:

| Token | Value | Use |
| --- | --- | --- |
| `--color-cream` | `#FFFFFF` | Page ground, raised surfaces, white type on a dark block |
| `--color-espresso` | `#0A0A0A` | The near-black blocks, and all type on the white ground |
| `--color-chocolate` | `#151515` | Elevated dark surface, one step off the blocks |
| `--color-ivory` | `#F6F6F7` | Subtle light tint: small cards, chips, hover states |
| `--color-taupe` | `#E4E4E7` | Hairlines and dividers |

The two anchor tokens are deliberately inverted from their names, so the class
names resolve consistently across every component:

- `bg-cream` paints a **white** surface, `text-cream` types **on a dark block**.
- `bg-espresso` paints a **near-black** block, `text-espresso` types **on white**.

Ink ramp: `--color-ink` `#0A0A0A`, `--color-ink-muted` `#52525B`,
`--color-ink-faint` `#7C7C85`, `--color-ink-ghost` `#A1A1AA`.

### The accent

One chromatic colour only: acid chartreuse `--color-mocha` `#D4FF3F` (aliased as
`--color-gold`, with `--color-gold-light` `#EAFF9C` and `--color-gold-deep`
`#9EC700`).

Acid sits at roughly 1.4:1 against white, so **it is never used for type on a
light surface**. It appears as:

- fills behind near-black text — the solid button, the active filter chip, focus
  rings, checkbox accents, form borders;
- hairline marks — `.gold-rule` (a rule that fades through the accent), the
  eyebrow dash, small bullets and the waveform bars on a case-study card.

`.gold-text` is therefore near-black on the white ground and white on the black
blocks, not acid.

### Surfaces

Surfaces are flat. There are no decorative blurred colour fields and no
background gradients: the only gradients left are `.hairline-grid` (a 1px grid
overlay) and `.gold-rule` (a hairline). A section marks itself with
`data-surface="dark"`, which is what inverts focus rings and the hairline grid.

Keep the near-black blocks low on the page. On every route the dark sections are
the closing ones — engagement, the closing CTA, and the footer — so the page
never flips black, back to white, then black again.

Typography is an editorial pairing, not a single family:

| Face | Role |
| --- | --- |
| `Fraunces` | Display — all headings, at weight 400 |
| `Geist` | Body copy and interface |
| `Geist_Mono` | Technical annotations, index marks, eyebrows |

All three are variable fonts loaded through `next/font`, so there is no layout
shift and no third-party font request. The display serif is the single biggest
reason the site reads as editorial rather than as a product template; it is
deliberately regular weight, with tight leading and modest tracking.

Layout rules are near-square — `3px` card, `2px` panel/tile/pill, `3px` input.
Structure comes from 1px `--color-rule` hairlines rather than from shadows or
rounded containers, so the four `--shadow-*` tokens are deliberately inert.
Cards carry no hover lift; interaction is signalled with a colour change.

Motion is purposeful and every animation is suppressed under
`prefers-reduced-motion`. Reveals, the mobile drawer, the work filter, the
accordion, and the timeline rail all respect it. Decorative motion (`sm-pulse`,
`kz-drift`, `kz-sweep`) is removed outright rather than fast-forwarded, so no
element is left stranded mid-animation.

There is intentionally no infinite marquee or moving band anywhere on the site.
Looping full-width text is a strong template signal and is also the most common
complaint about sites like this.

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root metadata, fonts, JSON-LD, header/footer
│   ├── page.tsx              Homepage
│   ├── icon.svg              Favicon
│   ├── not-found.tsx         Custom 404
│   ├── sitemap.ts            Generated from the content modules
│   ├── robots.ts
│   ├── actions/inquiry.ts    Contact server action
│   ├── services/             Index + [slug] detail
│   ├── work/                 Index + [slug] detail
│   ├── about/  contact/  privacy/  terms/
├── components/
│   ├── layout/               Header, footer, wordmark, contact email
│   ├── ui/                   Button, Card, Section, Reveal, SplitHeading,
│   │                         SplitRow, Accordion primitives
│   ├── home/                 Homepage sections
│   ├── work/                 Card + filter
│   ├── contact/              Inquiry form
│   ├── legal/                Shared legal page shell
│   ├── seo/                  JSON-LD renderer
│   └── visuals/              System map, architecture diagram, 3D form, figures
├── content/                  All copy and project data
└── lib/                      cn, env, validation
```

## Notes for maintainers

- **A `"use server"` file may only export async functions.** The inquiry state
  shape and `initialInquiryState` live in `src/lib/validation/inquiry-state.ts`
  for exactly this reason — exporting a plain object from a `"use server"`
  module turns it into a server reference on the client.
- **Never call `Date.now()` or read a ref during render.** The form's timing
  field is stamped from an event handler and carried in a hidden input.
- **Figures are generated, not photographed.** `TechnicalFigure` renders from a
  PRNG seeded on the study slug, so a project always shows the same schematic
  and nothing implies a real product screenshot.

## Accessibility

Skip link, single `<h1>` per page, semantic landmarks, visible focus rings that
invert on dark surfaces, keyboard-operable mobile navigation with focus
return, `aria-live` regions for the filter and form status, `aria-pressed` on
filter buttons, a polite live region announcing the result count, and full
reduced-motion support.