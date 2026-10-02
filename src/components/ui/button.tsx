import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "glass" | "onDark" | "onDarkOutline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex max-w-full items-center justify-center gap-2 rounded-pill font-sans font-medium tracking-[-0.005em] transition-[background-color,color,border-color] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none whitespace-normal sm:whitespace-nowrap";

const variants: Record<Variant, string> = {
  /* On the white ground: acid fill, near-black label. */
  solid: "bg-mocha text-espresso hover:bg-gold-light",
  outline:
    "border border-espresso/25 bg-transparent text-ink hover:border-mocha hover:text-espresso",
  glass: "glass text-ink hover:border-mocha hover:text-espresso",
  /* On the black blocks: white fill, near-black label. */
  onDark: "bg-cream text-espresso hover:bg-chocolate hover:text-cream",
  onDarkOutline:
    "border border-cream/30 text-cream hover:border-cream hover:bg-cream hover:text-espresso",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 py-1.5 text-[0.78rem] md:min-h-0",
  md: "min-h-11 px-5 py-2 text-[0.83rem] md:min-h-0",
  lg: "min-h-11 px-6 py-2.5 text-[0.875rem] md:min-h-0",
};

const shared: Record<Size, string> = {
  sm: "gap-1.5",
  md: "gap-2",
  lg: "gap-2.5",
};

export function buttonClasses({
  variant = "solid",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], shared[size], className);
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Renders the diagonal arrow used across the site's calls to action. */
  arrow?: boolean;
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  className,
  children,
  arrow = false,
  external = false,
  ...rest
}: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
      >
        {children}
        {arrow ? <ArrowGlyph /> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
      {arrow ? <ArrowGlyph /> : null}
    </Link>
  );
}

export function ArrowGlyph({ className }: { className?: string } = {}) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn(
        "size-[0.85em] shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 motion-reduce:group-hover/btn:translate-x-0 motion-reduce:group-hover/btn:-translate-y-0",
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M3.2 8.8 8.8 3.2" />
      <path d="M4.6 3.2h4.2v4.2" />
    </svg>
  );
}

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
