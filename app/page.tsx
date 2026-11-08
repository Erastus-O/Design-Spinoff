import Image from "next/image";
import { agenda, event, faqs, hero, speakerSlots, partners, routes, tickets, topics } from "@/components/site/content";
import { ContactForm } from "@/components/site/forms";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Reveal } from "@/components/site/reveal";
import { ButtonLink, Draft, Section, SectionHead, TopicChip, topicById } from "@/components/site/primitives";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Partners />
        <Topics />
        <Speakers />
        <Agenda />
        <TicketsTeaser />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Hero ---------- */

/** A small rounded image set into a line of headline text, as in the reference. */
function InlineChip({ src, alt, className = "" }: { src?: string; alt?: string; className?: string }) {
  return (
    <span
      className={`relative mx-[0.08em] inline-block h-[0.78em] w-[1.05em] overflow-hidden rounded-[0.14em] align-[-0.06em] ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
    </span>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-2 sm:px-4">
      <div className="relative isolate overflow-hidden rounded-xl bg-[#2a1680] text-white">
        <Image src="/images/hero-bg.webp" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
        {/* A light wash keeps white text readable over the bright highlights. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(20_10_70/0.45),rgb(20_10_70/0.15)_70%)]"
        />
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-7 px-5 pt-16 pb-16 text-center sm:px-8 md:pt-24 md:pb-20">
          <p className="flex items-center gap-2 text-[13px] text-white/80">
            <span aria-hidden className="size-1.5 bg-white" />
            {hero.eyebrow} · {event.city} · {event.edition}
          </p>
          <h1
            id="hero-title"
            className="text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-[5.2rem]"
          >
            Exploring the <InlineChip src="/images/2025-panel.webp" alt="" /> design landscape in today’s{" "}
            <InlineChip className="bg-px-green" /> industry
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/85">{hero.body}</p>

          {/* The reference's prompt box, here a quick way into registration. */}
          <form
            action={routes.tickets}
            method="get"
            className="mt-4 flex w-full max-w-3xl items-stretch gap-2 text-left"
          >
            <label className="flex min-h-36 flex-1 flex-col justify-between rounded-md border border-white/25 bg-white/15 p-4 backdrop-blur-md sm:p-5">
              <span className="text-[13px] text-white/80">Reserve your seat for Design Spin-off 2027</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@studio.com"
                className="w-full border-b border-white/40 bg-transparent pb-1 text-lg text-white placeholder:text-white/50 focus:border-white focus:outline-none sm:text-xl"
              />
            </label>
            <button
              type="submit"
              aria-label="Continue to tickets"
              className="grid w-24 shrink-0 place-items-center rounded-md bg-indigo text-white transition-colors hover:bg-indigo-dark sm:w-36"
            >
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 20V5M5.5 11.5 12 5l6.5 6.5" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </button>
          </form>
          <ul className="-mt-3 flex w-full max-w-3xl flex-wrap gap-1.5" aria-label="Topics">
            {topics.map((t) => (
              <li key={t.id}>
                <a
                  href={`#topic-${t.id}`}
                  className="inline-flex h-6 items-center px-2 text-[11px] font-medium text-white transition-[filter] hover:brightness-110"
                  style={{ background: t.color }}
                >
                  {t.name}
                </a>
              </li>
            ))}
          </ul>
          <dl className="mt-4 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[13px]">
            {[
              ["When", event.date],
              ["Expected venue", event.venue],
              ["Format", event.format],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="text-white/70">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------- Partners and sponsors ---------- */

// Placeholder slots pad the marquee until enough partners are confirmed.
const PARTNER_ROW = 6;

function Partners() {
  const slots = Math.max(PARTNER_ROW - partners.length, 0);
  const items = [
    ...partners.map((p) => ({ ...p, placeholder: false })),
    ...Array.from({ length: slots }, () => ({ name: "", logo: undefined, placeholder: true })),
  ];
  // Repeat short lists so one copy is always wider than the strip.
  const loop = Array.from({ length: Math.ceil(12 / items.length) }, () => items).flat();
  return (
    <section id="partners" aria-labelledby="partners-title" className="scroll-mt-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 border-y border-line px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex shrink-0 flex-col gap-1 lg:w-56">
          <h2 id="partners-title" className="text-[13px] leading-snug text-muted">
            Hosted by Sections, with our 2027 partners and sponsors
          </h2>
          <a href="#contact" className="w-fit text-[13px] font-medium text-indigo hover:underline">
            Become a sponsor →
          </a>
        </div>
        {/* Auto-scrolling marquee: the list is rendered twice and the track slides by
            half its width, so the loop is seamless. Hover or focus pauses it. */}
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className={`flex shrink-0 items-center ${copy === 1 ? "marquee-copy" : ""}`}
              >
                {loop.map((item, i) => (
                  <li key={i} className="flex h-8 shrink-0 items-center pr-14">
                    {item.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.logo}
                        alt={copy === 1 ? "" : item.name}
                        className="h-7 w-auto max-w-[8rem] object-contain grayscale"
                      />
                    ) : item.placeholder ? (
                      <span className="text-lg font-semibold tracking-tight whitespace-nowrap text-ink/20">
                        Your logo
                      </span>
                    ) : (
                      <span className="text-lg font-bold tracking-tight whitespace-nowrap">{item.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Topics ---------- */

function Topics() {
  return (
    <Section id="topics">
      <SectionHead
        eyebrow="Key design topics"
        title="Five forces reshaping design work"
        body="Every session sits in one of five topics. Together they make up the designer’s dilemma: what to learn, what to keep and what to let go."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t, i) => (
          <Reveal
            as="li"
            key={t.id}
            id={`topic-${t.id}`}
            delay={i * 90}
            className="group flex scroll-mt-24 flex-col gap-5 rounded-lg border border-line bg-card p-7"
          >
            <Reveal
              as="span"
              variant="drop"
              delay={i * 90 + 200}
              aria-hidden
              className="block h-4 w-12 transition-[width] duration-300 group-hover:w-28"
              style={{ background: t.color }}
            />
            <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
            <p className="text-[15px] leading-relaxed text-muted">{t.body}</p>
          </Reveal>
        ))}
        <Reveal
          as="li"
          delay={topics.length * 90}
          className="flex flex-col justify-between gap-6 rounded-lg bg-indigo p-7 text-white"
        >
          <h3 className="text-xl font-semibold tracking-tight">See how the five topics fill the day</h3>
          <a href="#agenda" className="w-fit text-sm font-medium underline underline-offset-4">
            View the agenda →
          </a>
        </Reveal>
      </ul>
    </Section>
  );
}

/* ---------- Speakers ---------- */

function Speakers() {
  return (
    <Section id="speakers">
      <SectionHead
        eyebrow="Speakers"
        title="UK voices across all five topics"
        body="A curated lineup of UK designers, engineers and design leaders, one or more for every topic. We’re revealing names in stages."
        aside={
          <ButtonLink href={`${routes.tickets}#register`} variant="outline">
            Get speaker updates
          </ButtonLink>
        }
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {speakerSlots.map((s, i) => {
          const t = topicById(s.topic);
          return (
            <Reveal as="li" key={i} delay={(i % 4) * 90} className="group flex flex-col gap-4">
              <div className="relative flex aspect-square max-w-full flex-col justify-end overflow-hidden rounded-lg bg-mist">
                <Reveal
                  as="span"
                  variant="drop"
                  delay={(i % 4) * 90 + 250}
                  aria-hidden
                  className="block h-[22%] transition-[height] duration-300 group-hover:h-[40%]"
                  style={{ background: t.color, width: `${60 + ((i * 13) % 35)}%` }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold">To be announced</p>
                <p className="text-sm text-muted">{s.format}</p>
                <TopicChip id={s.topic} />
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------- Agenda ---------- */

function Agenda() {
  return (
    <Section id="agenda">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6 self-start lg:sticky lg:top-24">
          <SectionHead
            eyebrow="Agenda"
            title="One day, start to finish"
            body="Talks in the morning, hands-on workshops after lunch, and drinks to close. Times are UK time."
          />
          <Draft>Draft programme</Draft>
        </div>
        <ol className="flex flex-col overflow-hidden rounded-lg border border-line bg-card">
          {agenda.map((item, i) => (
            <Reveal
              as="li"
              key={item.time}
              delay={i * 60}
              className="grid grid-cols-[4rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-line px-6 py-5 last:border-b-0 sm:grid-cols-[5rem_minmax(0,1fr)]"
            >
              <time className="text-sm text-muted tabular-nums">{item.time}</time>
              <div className="flex flex-col gap-2">
                <p className="text-[17px] leading-snug font-medium">{item.title}</p>
                {item.topic ? <TopicChip id={item.topic} /> : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Tickets teaser (full tickets live on /tickets) ---------- */

function TicketsTeaser() {
  return (
    <Section id="tickets">
      <div className="flex flex-col gap-8 rounded-xl bg-indigo p-8 text-white sm:p-12 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-xl flex-col gap-4">
          <p className="text-[15px] text-white/70">Tickets</p>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-[2.6rem]">
            Seats from {tickets[0].price}
          </h2>
          <p className="leading-relaxed text-white/80">
            {tickets.map((t) => `${t.name} ${t.price}`).join(" · ")}. Early-bird General tickets are limited.
          </p>
        </div>
        <a
          href={routes.tickets}
          className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium whitespace-nowrap text-indigo transition-colors hover:bg-white/90"
        >
          See tickets and register
        </a>
      </div>
    </Section>
  );
}

/* ---------- FAQs ---------- */

function Faqs() {
  return (
    <Section id="faqs">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="self-start lg:sticky lg:top-24">
          <SectionHead
            eyebrow="FAQs"
            title="Questions, answered"
            body={
              <>
                Can’t find what you need?{" "}
                <a href="#contact" className="text-ink underline underline-offset-4">
                  Send us a message
                </a>
                .
              </>
            }
          />
        </div>
        <div className="flex flex-col border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold hover:text-indigo">
                {f.q}
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-mist text-lg font-normal transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-12 rounded-xl border border-line bg-card p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHead
            eyebrow="Contact us"
            title="Talk to the team"
            body="Questions about tickets, sponsorship, press or anything else. We reply within two working days."
          />
          <dl className="flex flex-col gap-5 text-[15px]">
            {event.contactEmail ? (
              <div className="flex flex-col gap-1">
                <dt className="text-xs text-muted">Email</dt>
                <dd className="select-all">{event.contactEmail}</dd>
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted">Organiser</dt>
              <dd>
                <a
                  href={event.organiserUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-indigo"
                >
                  Sections ↗
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-muted">Expected venue</dt>
              <dd>
                {event.venue}, {event.city}
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
