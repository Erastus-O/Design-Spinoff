"use client";

import { useEffect, useState } from "react";
import { event, nav } from "./content";
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
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open ? "bg-cocoa/90 backdrop-blur-md" : "bg-cocoa"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:gap-8 sm:px-8">
        <a href="#top" aria-label={`${event.name} ${event.edition}, back to top`}>
          <Wordmark />
        </a>
        <nav aria-label="Sections" className="hidden items-center gap-7 text-sm lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-cream/85 hover:text-cream">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <a href="#contact" className="hidden text-sm text-cream/85 hover:text-cream sm:inline">
            Contact us
          </a>
          <ButtonLink href="#tickets" size="sm">
            Get tickets
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
                className={`absolute left-0 h-px w-5 bg-cream transition-transform ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-cream transition-transform ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" aria-label="Sections" className="border-t border-line px-4 pb-6 pt-2 sm:px-8 lg:hidden">
          <ul className="flex flex-col">
            {[...nav, { href: "#contact", label: "Contact us" }].map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-3 font-serif text-2xl"
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
