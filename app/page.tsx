import Image from "next/image";
import {
  agenda,
  dilemma,
  event,
  faqs,
  hero,
  speakerSlots,
  partners,
  routes,
  tickets,
  topics,
} from "@/components/site/content";
import { ContactForm } from "@/components/site/forms";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Reveal } from "@/components/site/reveal";
import {
  ButtonLink,
  Draft,
  Section,
  SectionHead,
  TopicChip,
  TopicRule,
  Wordmark,
  topicById,
} from "@/components/site/primitives";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Partners />
        <Dilemma />
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

// After the 2027 campaign artwork: title, multicolour rule and date on the left;
// the speakers in greyscale strips over the gradient on the right.
function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-2 sm:px-4">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-xl border border-line bg-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-7 px-6 pt-10 pb-10 sm:px-10 sm:pt-14 lg:py-14">
          <p className="text-[15px] text-muted">{hero.title}</p>
          <h1
            id="hero-title"
            className="text-[3.2rem] leading-[0.95] font-normal tracking-[-0.03em] text-balance sm:text-7xl lg:text-[5.6rem]"
          >
            The Designer’s Dilemma
          </h1>
          <TopicRule className="max-w-lg" />
          <div className="flex flex-col gap-1 text-sm">
            <p className="font-semibold">
              {event.date} · {event.venue.split(",")[0]}, {event.city.split(",")[0]}
            </p>
            <p className="text-muted">{event.watchParty}</p>
          </div>
          <p className="max-w-lg text-[15px] leading-relaxed text-muted">{hero.body}</p>

          {/* The reference's prompt box, here a quick way into registration. */}
          <form action={routes.tickets} method="get" className="flex w-full max-w-xl items-stretch gap-2">
            <label className="flex min-h-28 flex-1 flex-col justify-between rounded-md bg-mist p-4">
              <span className="text-[13px] text-muted">Reserve your seat for Design Spin-off 2027</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@studio.com"
                className="w-full border-b border-ink/20 bg-transparent pb-1 text-lg placeholder:text-ink/30 focus:border-ink focus:outline-none"
              />
            </label>
            <button
              type="submit"
              aria-label="Continue to tickets"
              className="grid w-20 shrink-0 place-items-center rounded-md bg-indigo text-white transition-colors hover:bg-indigo-dark sm:w-28"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 20V5M5.5 11.5 12 5l6.5 6.5" stroke="currentColor" strokeWidth="2.2" />
              </svg>
            </button>
          </form>
          <ul className="-mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
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
        </div>

        <div className="relative isolate min-h-[22rem] overflow-hidden sm:min-h-[28rem]">
          <Image src="/images/gradient.webp" alt="" fill priority sizes="50vw" className="-z-10 object-cover" />
          <div className="absolute inset-x-0 bottom-0 flex h-[78%] items-end gap-1 px-4 sm:px-6">
            {speakerSlots.map((s, i) => (
              <div
                key={s.photo}
                className={`relative min-w-0 flex-1 overflow-hidden rounded-t-md ${i % 2 ? "h-[88%]" : "h-full"}`}
              >
                <Image
                  src={s.photo}
                  alt=""
                  fill
                  sizes="12vw"
                  className="object-cover grayscale contrast-110"
                  priority
                />
              </div>
            ))}
          </div>
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

/* ---------- The dilemma (opening hook from the talk outline) ---------- */

function Dilemma() {
  return (
    <Section id="dilemma">
      <SectionHead
        eyebrow="The Designer’s Dilemma"
        title="Who designs now?"
        body="Two numbers that seem to disagree."
      />
      <div className="grid gap-3 md:grid-cols-2">
        {dilemma.numbers.map((n, i) => (
          <Reveal
            key={n.value}
            delay={i * 120}
            className="flex flex-col gap-4 rounded-lg border border-line bg-card p-7 sm:p-9"
          >
            <p className="text-7xl font-semibold tracking-[-0.035em] tabular-nums sm:text-8xl">{n.value}</p>
            <p className="max-w-sm text-[15px] leading-relaxed">{n.label}</p>
            <p className="text-[12px] text-muted">Source: {n.source}</p>
          </Reveal>
        ))}
      </div>
      <p className="text-xl font-medium tracking-tight">{dilemma.line}</p>
      <ol className="grid gap-8 border-t border-line pt-8 md:grid-cols-3">
        {dilemma.takeaways.map((t, i) => (
          <li key={t.title} className="flex flex-col gap-2">
            <span className="text-[13px] text-muted tabular-nums">0{i + 1}</span>
            <h3 className="text-lg font-semibold tracking-tight">{t.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{t.body}</p>
          </li>
        ))}
      </ol>
      <p className="max-w-3xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
        “{dilemma.close}”
      </p>
    </Section>
  );
}

/* ---------- Topics ---------- */

function Topics() {
  return (
    <Section id="topics">
      <SectionHead
        eyebrow="Key design topics"
        title="Five forces reshaping design work"
        body="Routine production is getting cheaper and judgement is getting more valuable. Every session sits in one of five topics, which together make up the designer’s dilemma."
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
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
        {speakerSlots.map((s, i) => {
          const t = topicById(s.topic);
          return (
            <Reveal
              as="li"
              key={s.photo}
              delay={i * 90}
              className="group flex flex-col gap-4 max-md:last:col-span-2 max-md:last:mx-auto max-md:last:w-[calc(50%-0.5rem)]"
            >
              <div className="relative aspect-[4/5] max-w-full overflow-hidden rounded-lg bg-mist">
                <Image
                  src={s.photo}
                  alt={s.name ? s.name : `Speaker for ${t.name}, name to be announced`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
                <Reveal
                  as="span"
                  variant="drop"
                  delay={i * 90 + 250}
                  aria-hidden
                  className="absolute bottom-0 left-0 block h-[8%] transition-[height] duration-300 group-hover:h-[14%]"
                  style={{ background: t.color, width: `${60 + ((i * 13) % 35)}%` }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-semibold">{s.name ?? "Name to be announced"}</p>
                <p className="text-sm text-muted">{s.role ? `${s.role} · ${s.format}` : s.format}</p>
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
      <div className="relative isolate flex flex-col gap-8 overflow-hidden rounded-xl p-8 sm:p-12 md:flex-row md:items-end md:justify-between">
        <Image src="/images/gradient.webp" alt="" fill sizes="100vw" className="-z-10 object-cover object-left" />
        <div className="flex max-w-xl flex-col gap-4">
          <Wordmark badge className="h-10 self-start" />
          <h2 className="mt-4 text-4xl leading-[1] font-normal tracking-[-0.03em] text-balance sm:text-6xl">
            Seats from {tickets[0].price}
          </h2>
          <p className="leading-relaxed text-ink/80">
            {tickets.map((t) => `${t.name} ${t.price}`).join(" · ")}. Early-bird General tickets are limited.
          </p>
        </div>
        <a
          href={routes.tickets}
          className="inline-flex h-12 items-center justify-center rounded-md bg-ink px-8 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-ink/80"
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
