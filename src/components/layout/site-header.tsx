"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type RefObject,
} from "react";

import { primaryNav, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";

import { ContactEmailLink } from "./contact-email";
import { Wordmark } from "./wordmark";

/** Primary site header. Transparent at the top of the page, frosted once stuck. */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  //
  // Done by adjusting state during render rather than in an effect: React
  // re-renders immediately when the pathname changes, so there is no flash of
  // an open menu, and no cascading render from a setState-in-effect pass.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-pill focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-mocha focus:px-4 focus:py-2 focus:text-[0.8rem] focus:text-espresso"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500",
          scrolled || open
            ? "border-b border-rule bg-cream/85 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6 md:h-20">
          <Wordmark priority />

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <NavLink item={item} pathname={pathname} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ContactEmailLink className="hidden text-[0.8rem] lg:inline" />
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={panelId}
            className="relative z-10 -mr-1 flex h-11 w-11 items-center justify-center rounded-pill border border-rule text-ink backdrop-blur-sm transition-colors hover:border-mocha hover:text-espresso md:hidden"
      >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuGlyph open={open} />
          </button>
        </div>

        <MobilePanel
          id={panelId}
          open={open}
          onClose={() => setOpen(false)}
          pathname={pathname}
          returnFocusRef={toggleRef}
        />
      </header>
    </>
  );
}

function NavLink({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string | null;
}) {
  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname?.startsWith(`${item.href}/`));

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex items-center rounded-pill px-3.5 py-2 text-[0.82rem] transition-colors duration-200",
        isActive ? "text-ink" : "text-ink-muted hover:text-ink",
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300",
          isActive ? "scale-x-100" : "scale-x-0",
        )}
      />
    </Link>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative block h-3 w-4">
      <span
        className={cn(
          "absolute left-0 block h-px w-full bg-current transition-transform duration-300",
          open ? "top-1.5 rotate-45" : "top-0.5",
        )}
      />
      <span
        className={cn(
          "absolute left-0 block h-px w-full bg-current transition-opacity duration-200",
          open ? "top-1.5 opacity-0" : "top-2.5",
        )}
      />
    </span>
  );
}

function MobilePanel({
  id,
  open,
  onClose,
  pathname,
  returnFocusRef,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string | null;
  /** The menu button that opened this panel, so focus can be returned to it. */
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes, and focus returns to the trigger. The panel sits in normal
  // flow rather than overlaying the page, so the rest of the document stays
  // reachable by keyboard and no focus trap is required.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        returnFocusRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, returnFocusRef]);

  // Move focus into the panel when it opens.
  useEffect(() => {
    if (open) {
      const firstLink = panelRef.current?.querySelector<HTMLElement>("a");
      firstLink?.focus();
    }
  }, [open]);

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          id={id}
          ref={panelRef}
          key="panel"
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-rule bg-cream/95 backdrop-blur-xl md:hidden"
        >
          <nav
            aria-label="Mobile"
            className="shell flex flex-col gap-1 py-6"
          >
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-baseline justify-between border-b border-rule-soft py-4"
                  >
                    <span className="font-display text-2xl text-ink">
                      {item.label}
                    </span>
                    <span className="tech-label text-ink-ghost">
                      {pathname === item.href ? "Current" : "→"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex justify-center">
              <ContactEmailLink className="text-[0.8rem]" />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
