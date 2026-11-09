"use client";

import { useEffect, useState } from "react";
import { event, homeAnchor, nav, routes } from "./content";
import { ButtonLink, Wordmark } from "./primitives";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-shadow ${
        scrolled || open ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5 sm:gap-8 sm:px-8">
        <a href={homeAnchor("top")} aria-label={`${event.name} ${event.edition}, back to top`}>
          <Wordmark badge className="h-11" />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-muted hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <a href={homeAnchor("contact")} className="hidden text-sm text-muted hover:text-ink sm:inline">
            Contact us
          </a>
          <ButtonLink href={routes.tickets} size="sm">
            Register
          </ButtonLink>
          <button
            type="button"
            className="-mr-2 grid size-10 place-items-center rounded-md lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Sections" className="px-5 pt-2 pb-6 sm:px-8 lg:hidden">
          <ul className="flex flex-col">
            {[...nav, { href: homeAnchor("contact"), label: "Contact us" }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 text-xl font-semibold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
