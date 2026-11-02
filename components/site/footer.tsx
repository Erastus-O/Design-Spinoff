import { homeAnchor, nav, routes, topics } from "./content";
import { ButtonLink, Wordmark } from "./primitives";
import { Reveal } from "./reveal";

/* ---------- Footer ---------- */

export function Footer() {
  return (
    <footer>
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pt-8 pb-14 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl">
            See you in London.
          </p>
          <ButtonLink href={routes.tickets}>Register</ButtonLink>
        </div>
        <div className="flex h-3" aria-hidden>
          {topics.map((t, i) => (
            <Reveal
              as="span"
              variant="drop"
              key={t.id}
              delay={i * 110}
              className="block flex-1"
              style={{ background: t.color }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              ...nav,
              { href: homeAnchor("partners"), label: "Partners" },
              { href: homeAnchor("contact"), label: "Contact" },
            ].map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </a>
            ))}
          </nav>
          <p>© 2026 Sections</p>
        </div>
      </div>
    </footer>
  );
}
