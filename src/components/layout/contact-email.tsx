import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The single guarded contact-email renderer.
 *
 * Every place that mentions the studio inbox goes through this component, so
 * the "is a real inbox published?" decision can never be made inconsistently.
 * When `NEXT_PUBLIC_CONTACT_EMAIL` is not set, no `mailto:` link is rendered at
 * all — instead a visible placeholder points the visitor at the contact form.
 * That is what keeps the site from advertising an inbox that does not exist.
 */
export function ContactEmailLink({
  tone = "light",
  className,
  /** Shown before the address when live. */
  prefix,
}: {
  tone?: "light" | "dark";
  className?: string;
  prefix?: string;
}) {
  const dark = tone === "dark";

  if (!siteConfig.contactEmailIsLive) {
    return (
      <span
        className={cn(
          "flex flex-col gap-1",
          dark ? "text-cream/60" : "text-ink-muted",
          className,
        )}
      >
        <span className={cn(dark ? "text-[0.9rem]" : "text-[0.85rem]")}>
          Contact address to be published
        </span>
        <span
          className={cn(
            "font-mono tracking-[0.06em]",
            dark ? "text-[0.72rem] text-cream/40" : "text-[0.75rem] text-ink-ghost",
          )}
        >
          Use the contact form — it reaches us
        </span>
      </span>
    );
  }

  return (
    <a
      href={`mailto:${siteConfig.contactEmail}`}
      className={cn(
        "inline-flex min-h-11 items-center underline underline-offset-4 transition-colors duration-200 md:min-h-0",
        dark
          ? "text-cream decoration-cream/25 hover:decoration-cream"
          : "text-ink-muted decoration-rule hover:text-ink hover:decoration-mocha",
        className,
      )}
    >
      {prefix ? `${prefix} ` : null}
      {siteConfig.contactEmail}
    </a>
  );
}