import Image from "next/image";
import {
  agenda,
  event,
  faqs,
  hero,
  speakerOrgs2025,
  speakerSlots,
  sponsorTiers,
  sponsorValue,
  stats2025,
  routes,
  tickets,
  topics,
} from "@/components/site/content";
import { ContactForm, SponsorForm } from "@/components/site/forms";
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
        <Topics />
        <Speakers />
        <Agenda />
        <TicketsTeaser />
        <Sponsor />
        <Partners />
        <Recap />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Hero ---------- */

/** The stacked topic blocks from the reference, sitting at the foot of a grey card. */
function TopicStack({ className = "" }: { className?: string }) {
  // Accessibility sits on top, Design and Design Engineering share a row.
  const rows = [["accessibility"], ["design", "design-engineering"], ["ai"], ["vibecoding"]] as const;
  let delay = 0;
  return (
    <div className={`relative flex flex-col ${className}`}>
      {rows.map((row, r) => (
        <div key={r} className="relative h-[clamp(2.25rem,6vw,3.1rem)]">
          {row.map((id) => {
            const t = topicById(id);
            delay += 1;
            return (
              <a
                key={id}
                href={`#topic-${id}`}
                className="drop-in absolute inset-y-0 flex items-center px-[clamp(0.75rem,2.5vw,1.9rem)] text-[clamp(0.95rem,2.2vw,1.55rem)] text-white transition-[filter] hover:brightness-110"
                style={{
                  left: `${t.bar.left}%`,
                  width: `${t.bar.width}%`,
                  background: t.color,
                  justifyContent:
                    t.bar.align === "start" ? "flex-start" : t.bar.align === "end" ? "flex-end" : "center",
                  animationDelay: `${0.25 + (5 - delay) * 0.12}s`,
                }}
              >
                <span className="truncate">{t.name}</span>
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-12 pb-20 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-16 md:pt-20 md:pb-28">
        <div className="flex flex-col items-start gap-6">
          <p className="text-[15px] text-muted">{hero.eyebrow}</p>
          <h1
            id="hero-title"
            className="text-[2.4rem] leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
          >
            {hero.title}
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">{hero.body}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ButtonLink href={routes.tickets}>Register</ButtonLink>
            <ButtonLink href="#sponsor" variant="outline">
              Become a sponsor
            </ButtonLink>
          </div>
          <dl className="mt-6 grid w-full max-w-md grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {[
              ["When", event.date],
              ["Where", event.city],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="text-xs text-muted">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex aspect-[588/717] max-w-full flex-col justify-between overflow-hidden rounded-3xl bg-mist">
          <div className="flex flex-col gap-1 p-6 sm:p-8">
            <p className="text-xs text-muted">Expected venue</p>
            <p className="text-lg font-semibold">{event.venue}</p>
            <p className="text-sm text-muted">{event.city}</p>
          </div>
          <TopicStack />
        </div>
      </div>
    </section>
  );
}

/* ---------- Topics ---------- */

function Topics() {
  return (
    <Section id="topics" className="bg-mist">
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
            className="group flex scroll-mt-24 flex-col gap-5 rounded-2xl bg-paper p-7"
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
          className="flex flex-col justify-between gap-6 rounded-2xl bg-indigo p-7 text-white"
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
              <div className="relative flex aspect-square max-w-full flex-col justify-end overflow-hidden rounded-2xl bg-mist">
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
    <Section id="agenda" className="bg-mist">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6 self-start lg:sticky lg:top-24">
          <SectionHead
            eyebrow="Agenda"
            title="One day, start to finish"
            body="Talks in the morning, hands-on workshops after lunch, and drinks to close. Times are UK time."
          />
          <Draft>Draft programme</Draft>
        </div>
        <ol className="flex flex-col overflow-hidden rounded-2xl bg-paper">
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
      <div className="flex flex-col gap-8 rounded-3xl bg-indigo p-8 text-white sm:p-12 md:flex-row md:items-end md:justify-between">
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

/* ---------- Sponsor ---------- */

function Sponsor() {
  return (
    <Section id="sponsor" className="bg-mist">
      <SectionHead
        eyebrow="Become a sponsor"
        title="Put your brand in front of the UK’s design community"
        body="Partner with Sections on Design Spin-off 2027 and reach senior designers, design engineers and product leaders in one room."
      />
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {sponsorValue.map((v) => (
          <li key={v.title} className="flex flex-col gap-2">
            <h3 className="font-semibold">{v.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{v.body}</p>
          </li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-2">
        <ul className="flex flex-col gap-3">
          {sponsorTiers.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i * 100}
              className={`flex flex-col gap-4 rounded-2xl bg-paper p-6 ${i === 0 ? "ring-2 ring-indigo" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight">{t.name}</h3>
                <span className="text-xs text-muted">{t.slots}</span>
              </div>
              <ul className="grid gap-2 text-sm text-muted sm:grid-cols-2">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 bg-indigo" aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ul>
        <SponsorForm />
      </div>
    </Section>
  );
}

/* ---------- Partners ---------- */

function Partners() {
  return (
    <Section id="partners">
      <SectionHead
        eyebrow="Partners"
        title="Hosted by Sections, built with partners"
        body="Partner announcements for 2027 start soon."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li className="flex min-h-48 flex-col justify-between gap-6 rounded-2xl bg-indigo p-6 text-white sm:col-span-2 lg:row-span-2">
          <p className="text-xs text-white/70">Host</p>
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-bold tracking-tight">Sections</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/80">
              The design studio and community behind Design Spin-off, bringing designers closer to the practical reality
              of product work.
            </p>
            <a
              href={event.organiserUrl}
              target="_blank"
              rel="noreferrer"
              className="w-fit text-sm font-medium underline underline-offset-4"
            >
              Visit Sections ↗
            </a>
          </div>
        </li>
        {[
          ["Headline partner", "1 slot open"],
          ["Topic partner", "5 slots open"],
          ["Community partner", "Open"],
          ["Media partner", "Open"],
        ].map(([label, slots], i) => (
          <Reveal as="li" key={label} delay={(i + 1) * 90}>
            <a
              href="#sponsor"
              className="flex h-full min-h-48 flex-col justify-between gap-6 rounded-2xl border border-dashed border-ink/20 p-6 transition-colors hover:border-indigo"
            >
              <p className="text-xs text-muted">{label}</p>
              <div className="flex flex-col gap-1">
                <p className="text-lg font-semibold">Your brand here</p>
                <p className="text-sm text-indigo">{slots} →</p>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Recap (2025, Lagos) ---------- */

function Recap() {
  return (
    <Section id="recap" className="bg-mist">
      <SectionHead
        eyebrow="Where it started"
        title="Design Spin-off 2025, Lagos"
        body={`Our last edition filled The Polygon HQ on Victoria Island, with speakers from ${speakerOrgs2025
          .slice(0, 5)
          .join(", ")} and more.`}
      />
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          ["/images/2025-panel.webp", "Two panelists in conversation on the Design Spin-off 2025 stage"],
          ["/images/2025-crowd.webp", "The audience listening during a session"],
          ["/images/2025-audience-qa.webp", "An attendee asking a question during the Q&A"],
        ].map(([src, alt]) => (
          <figure key={src} className="relative aspect-[4/3] max-w-full overflow-hidden rounded-2xl">
            <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
          </figure>
        ))}
      </div>
      <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats2025.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="flex flex-col gap-1">
            <dd className="text-3xl font-bold tracking-tight tabular-nums sm:text-4xl">{s.value}</dd>
            <dt className="text-sm text-muted">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
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
      <div className="grid gap-12 rounded-3xl bg-mist p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
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
