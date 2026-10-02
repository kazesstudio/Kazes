import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/cn";

const SIZES = {
  sm: "h-6",
  md: "h-9",
  lg: "h-14",
} as const;

const SOURCES = {
  /** Near-black logo. The site is white-first, so this is the default. */
  dark: "/brand/logo-mark-ink.png",
  /** White logo, for placement on a near-black block. */
  light: "/brand/logo-mark-white.png",
  /** Acid logo, for placement on a mid-tone accent field. */
  acid: "/brand/logo-mark-acid.png",
} as const;

export function Wordmark({
  className,
  tone = "dark",
  size = "md",
  priority = false,
  as: Tag = Link,
  href = "/",
}: {
  className?: string;
  tone?: keyof typeof SOURCES;
  size?: keyof typeof SIZES;
  priority?: boolean;
  as?: typeof Link;
  href?: string;
}) {
  return (
    <Tag
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center rounded-pill leading-none transition-opacity duration-200 hover:opacity-70 md:min-h-0",
        className,
      )}
    >
      <span className="sr-only">KAZES.studio — home</span>
      <Image
        src={SOURCES[tone]}
        alt=""
        aria-hidden="true"
        width={688}
        height={370}
        priority={priority}
        className={cn("w-auto", SIZES[size])}
      />
    </Tag>
  );
}