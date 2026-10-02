import type { ArchitectureLayer } from "@/content/case-studies";
import { cn } from "@/lib/cn";

/**
 * Architecture stack diagram, rendered directly from the case study's
 * `architecture` field. Adding layers or items in the content file updates
 * every diagram on the site with no further work.
 */
export function ArchitectureDiagram({
  caption,
  layers,
  className,
  tone = "dark",
}: {
  caption: string;
  layers: ArchitectureLayer[];
  className?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-card border p-6 md:p-8",
        dark
          ? "border-cream/10 bg-chocolate text-cream shadow-card"
          : "border-rule-soft bg-cream text-ink shadow-soft",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="hairline-grid absolute inset-0 opacity-70"
      />

      <figcaption
        className={cn(
          "tech-label relative flex items-center gap-3",
          dark ? "text-cream/45" : "text-ink-faint",
        )}
      >
        <span
          aria-hidden="true"
          className={cn("h-px w-6", dark ? "bg-cream/30" : "bg-mocha/50")}
        />
        Architecture
      </figcaption>

      <p
        className={cn(
          "relative mt-4 max-w-[62ch] text-[0.9rem] leading-relaxed",
          dark ? "text-cream/70" : "text-ink-muted",
        )}
      >
        {caption}
      </p>

      <ol
        className={cn(
          "relative mt-8 flex flex-col gap-0",
          "sm:grid sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-5",
        )}
      >
        {layers.map((layer, index) => (
          <li
            key={layer.name}
            className={cn(
              "relative flex flex-col gap-3 border-t py-5 sm:border-t-0 sm:py-0 lg:border-t",
              dark ? "border-cream/15" : "border-rule",
              index < layers.length - 1 &&
                "after:absolute after:left-0 after:top-full after:h-3 after:w-px after:bg-current after:opacity-15 lg:after:h-auto lg:after:w-full lg:after:top-4 lg:after:left-0 lg:hidden",
            )}
          >
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn(
                  "font-mono text-[0.65rem] tracking-[0.18em] tnum",
                  dark ? "text-cream" : "text-espresso",
                )}
              >
                L{index + 1}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 rounded-full",
                  dark ? "bg-cream/40" : "bg-mocha/70",
                )}
              />
            </div>

            <h3
              className={cn(
                "text-[0.95rem] font-medium tracking-[-0.01em]",
                dark ? "text-cream" : "text-ink",
              )}
            >
              {layer.name}
            </h3>

            <ul className="flex flex-col gap-1.5">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "text-[0.78rem] leading-snug",
                    dark ? "text-cream/55" : "text-ink-faint",
                  )}
                >
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </figure>
  );
}
