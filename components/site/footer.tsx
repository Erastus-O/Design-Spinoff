import { event, homeAnchor, nav, routes } from "./content";
import { Wordmark } from "./primitives";

/* ---------- Footer ---------- */

// After the reference: small link columns, then a band with a giant pixel
// wordmark and a black side bar whose rotated label is the main call to action.
export function Footer() {
  const columns = [
    { title: "Event", links: nav.filter((n) => n.href !== routes.tickets) },
    {
      title: "Attend",
      links: [
        { href: routes.tickets, label: "Tickets" },
        { href: `${routes.tickets}#register`, label: "Register" },
        { href: homeAnchor("faqs"), label: "FAQs" },
      ],
    },
    {
      title: "Talk to us",
      links: [
        { href: homeAnchor("contact"), label: "Contact" },
        { href: homeAnchor("partners"), label: "Become a sponsor" },
        { href: event.organiserUrl, label: "Sections ↗" },
      ],
    },
  ];

  return (
    <footer className="mt-10">
      <div className="mx-auto grid max-w-6xl gap-10 border-t border-line px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-4">
          <Wordmark className="h-11" />
          <p className="max-w-xs text-[13px] leading-relaxed text-muted">
            {event.theme}. {event.date}, {event.venue}, {event.city}.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2.5 text-[13px]">
            <p className="text-muted">{col.title}</p>
            {col.links.map((l) => (
              <a key={l.label} href={l.href} className="w-fit hover:underline">
                {l.label}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="flex bg-px-olive">
        <div className="flex min-w-0 flex-1 flex-col justify-end gap-6 overflow-hidden px-5 pt-12 pb-6 sm:px-8">
          <p
            aria-hidden
            className="font-pixel text-[clamp(3.6rem,15vw,13rem)] leading-[0.82] font-bold tracking-tight text-px-pink"
          >
            Spin-
            <br />
            off.
          </p>
          <p className="text-[12px] text-white/60">© 2026 Sections. Design Spin-off is a Sections event.</p>
        </div>
        <a
          href={routes.tickets}
          className="flex w-14 shrink-0 items-center justify-center bg-ink py-6 text-white transition-colors hover:bg-indigo sm:w-20"
        >
          <span className="text-lg font-medium tracking-tight [writing-mode:vertical-rl] sm:text-2xl">
            Register for 2027 →
          </span>
        </a>
      </div>
    </footer>
  );
}
