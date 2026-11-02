import Image from "next/image";
import {
  agenda,
  event,
  faqs,
  hero,
  nav,
  speakerOrgs2025,
  speakers2025,
  sponsorTiers,
  sponsorValue,
  stats2025,
  topics,
} from "@/components/site/content";
import { ContactForm, SponsorForm, TicketsAndRegister } from "@/components/site/forms";
import { Header } from "@/components/site/header";
import { ButtonLink, Draft, Section, SectionHead, Wordmark, initials } from "@/components/site/primitives";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Topics />
        <Recap />
        <Speakers />
        <Agenda />
        <Tickets />
        <Sponsor />
        <Partners />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ---------- Hero ---------- */

// Jagged edge for the torn-paper accent, echoing the reference's lilac scrap.
const TORN =
  "0,62 6,48 11,55 17,36 24,44 30,22 37,31 43,12 50,20 57,4 64,16 70,6 77,18 83,9 90,24 96,14 100,20 100,100 0,100";

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="px-2 pb-2 sm:px-4">
      <div className="relative isolate min-h-[640px] overflow-hidden rounded-2xl bg-cocoa-2 sm:min-h-[680px]">
        <Image
          src="/images/2025-laughter.webp"
          alt="Attendees laughing together between sessions at Design Spin-off 2025"
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[72%_center]"
        />
        {/* Warm the stage lighting toward the cocoa palette, then fade for legibility. */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-[#6b4528]/45 mix-blend-multiply" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(27_17_11/0.94)_0%,rgb(27_17_11/0.78)_38%,rgb(27_17_11/0.15)_75%,transparent_100%)] max-md:bg-[linear-gradient(0deg,rgb(27_17_11/0.96)_0%,rgb(27_17_11/0.85)_55%,rgb(27_17_11/0.35)_100%)]"
        />

        <dl
          aria-label="Design Spin-off 2025 in numbers"
          className="absolute right-10 top-10 hidden flex-col gap-1 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-cream/45 xl:flex"
        >
          {stats2025.map((s) => (
            <div key={s.label} className="flex gap-6">
              <dt className="w-40">{s.label}</dt>
              <dd className="tabular-nums">{s.value}</dd>
            </div>
          ))}
        </dl>

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute -bottom-px right-0 h-16 w-[42%] text-lilac sm:h-24 sm:w-[26%]"
        >
          <polygon points={TORN} fill="currentColor" />
        </svg>

        <div className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-end gap-7 px-5 pb-16 pt-28 sm:px-10 md:justify-center md:pb-24">
          <a href="#recap" className="group flex w-full max-w-md items-center gap-3 text-[13px] text-cream/90">
            <span className="shrink-0 rounded border border-cream/40 px-2 py-0.5">{hero.pill}</span>
            <span className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
              <span className="ticker flex w-max gap-10 whitespace-nowrap">
                <span>{hero.ticker}</span>
                <span aria-hidden>{hero.ticker}</span>
              </span>
            </span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </a>

          <h1
            id="hero-title"
            className="max-w-2xl font-serif text-[3.1rem] leading-[0.98] tracking-tight text-balance sm:text-7xl"
          >
            {hero.title}
          </h1>
          <p className="max-w-lg text-[17px] leading-relaxed text-cream/85">{hero.body}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#tickets">Register now</ButtonLink>
            <ButtonLink href="#sponsor" variant="outline">
              Become a sponsor
            </ButtonLink>
          </div>
          <dl className="mt-4 grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 border-t border-cream/20 pt-6 text-sm sm:grid-cols-3">
            {[
              ["When", event.date],
              ["Where", event.city],
              ["Format", event.format],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-3 py-10 sm:px-6 lg:flex-row lg:items-center lg:gap-16">
        <p className="max-w-[15rem] shrink-0 text-[13px] leading-snug text-sand">
          2025 speakers came from teams at leading African product companies
        </p>
        <ul className="flex flex-1 flex-wrap items-center justify-between gap-x-10 gap-y-4">
          {speakerOrgs2025.map((org, i) => (
            <li
              key={org}
              className={`whitespace-nowrap text-cream/80 ${
                i % 2 ? "font-sans text-lg font-semibold tracking-tight" : "font-serif text-xl italic"
              }`}
            >
              {org}
            </li>
          ))}
        </ul>
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
        title={<>Six tracks for {event.theme}</>}
        body="Each track runs as a panel, fireside or workshop, led by people shipping the work. Built on the four tracks that filled the room in 2025."
        aside={<Draft>2027 tracks in draft</Draft>}
      />
      <ul className="grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <li key={t.title} className="flex flex-col gap-4 border-b border-r border-line p-6 sm:p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-lilac">{t.tag}</span>
            <h3 className="font-serif text-2xl leading-tight">{t.title}</h3>
            <p className="leading-relaxed text-sand">{t.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- 2025 recap ---------- */

function Recap() {
  return (
    <Section id="recap" className="bg-cocoa-2">
      <SectionHead
        eyebrow="Last edition"
        title="Design Spin-off 2025, in a room on Victoria Island"
        body="We asked how to design for an AI-powered Africa. Designers, founders, fintech leaders and regulators answered on stage and kept going long after."
      />
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr]">
        <figure className="relative aspect-[4/3] max-w-full overflow-hidden rounded-xl md:row-span-2 md:aspect-auto">
          <Image
            src="/images/2025-panel.webp"
            alt="Two panelists in conversation on the Design Spin-off 2025 stage"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover"
          />
        </figure>
        <figure className="relative aspect-[16/10] max-w-full overflow-hidden rounded-xl">
          <Image
            src="/images/2025-crowd.webp"
            alt="The audience listening during a session"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </figure>
        <figure className="relative aspect-[16/10] max-w-full overflow-hidden rounded-xl">
          <Image
            src="/images/2025-audience-qa.webp"
            alt="An attendee asking a question during the Q&A"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover"
          />
        </figure>
      </div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
        {stats2025.map((s) => (
          <div key={s.label} className="flex flex-col gap-1 bg-cocoa-2 p-6">
            <dd className="font-serif text-4xl tracking-tight tabular-nums sm:text-5xl">{s.value}</dd>
            <dt className="text-sm text-sand">{s.label}</dt>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ---------- Speakers ---------- */

function Speakers() {
  return (
    <Section id="speakers">
      <SectionHead
        eyebrow="Speakers"
        title="The people on stage"
        body="The 2027 lineup is being confirmed now. Here’s who joined us in 2025."
        aside={
          <ButtonLink href="#contact" variant="outline">
            Apply to speak
          </ButtonLink>
        }
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {speakers2025.map((s, i) => (
          <li key={s.name} className="flex flex-col gap-4">
            <div
              aria-hidden
              className={`grid aspect-square max-w-full place-items-center rounded-xl font-serif text-5xl sm:text-6xl ${
                i % 3 === 0 ? "bg-lilac text-cocoa" : i % 3 === 1 ? "bg-cocoa-3 text-cream" : "bg-cream text-cocoa"
              }`}
            >
              {initials(s.name)}
            </div>
            <div className="flex flex-col gap-0.5">
              <h3 className="font-medium">{s.name}</h3>
              <p className="text-sm text-sand">
                {s.role}, {s.org}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-4 rounded-xl border border-dashed border-cream/25 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex flex-col gap-1">
          <p className="font-serif text-2xl">2027 speakers announced soon</p>
          <p className="text-sand">Register and we’ll email you as each name is confirmed.</p>
        </div>
        <ButtonLink href="#register">Get speaker updates</ButtonLink>
      </div>
    </Section>
  );
}

/* ---------- Agenda ---------- */

function Agenda() {
  return (
    <Section id="agenda">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8 lg:sticky lg:top-24 lg:self-start">
          <SectionHead
            eyebrow="Agenda"
            title="One day, start to finish"
            body="Talks in the morning, hands-on workshops after lunch, and a mixer to close. Times are West Africa Time."
          />
          <Draft>Draft programme</Draft>
          <figure className="flex flex-col gap-3">
            <div className="relative aspect-[3/2] max-w-full overflow-hidden rounded-xl">
              <Image
                src="/images/2025-venue-polygon-hq.webp"
                alt="Rows of chairs set out inside The Polygon HQ"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="text-[13px] text-sand">
              2025 venue: The Polygon HQ, Victoria Island. 2027 venue to be announced.
            </figcaption>
          </figure>
        </div>
        <ol className="flex flex-col border-t border-line">
          {agenda.map((item) => (
            <li
              key={item.time}
              className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 border-b border-line py-5 sm:grid-cols-[5.5rem_7rem_minmax(0,1fr)] sm:items-baseline"
            >
              <time className="font-mono text-sm tabular-nums text-sand">{item.time}</time>
              <span
                className={`w-fit font-mono text-[10px] uppercase tracking-[0.18em] ${
                  item.kind === "Break" || item.kind === "Arrivals" || item.kind === "Social"
                    ? "text-sand"
                    : "text-lilac"
                }`}
              >
                {item.kind}
              </span>
              <p className="col-span-2 font-serif text-xl leading-snug sm:col-span-1 sm:text-2xl">{item.title}</p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ---------- Tickets + register ---------- */

function Tickets() {
  return (
    <Section id="tickets" className="bg-cocoa-2/40">
      <SectionHead
        eyebrow="Tickets"
        title="Pick your seat"
        body="Prices are in naira and include lunch. Early-bird General tickets are limited."
        aside={<Draft>Draft pricing</Draft>}
      />
      <TicketsAndRegister />
    </Section>
  );
}

/* ---------- Sponsor ---------- */

function Sponsor() {
  return (
    <Section id="sponsor">
      <SectionHead
        eyebrow="Become a sponsor"
        title="Put your brand in front of the people building African products"
        body="Partner with Sections on Design Spin-off 2027 and reach senior designers, product leaders and decision-makers in one room."
      />
      <ul className="grid gap-x-8 gap-y-8 border-y border-line py-10 sm:grid-cols-2 lg:grid-cols-5">
        {sponsorValue.map((v) => (
          <li key={v.title} className="flex flex-col gap-2">
            <h3 className="font-medium">{v.title}</h3>
            <p className="text-sm leading-relaxed text-sand">{v.body}</p>
          </li>
        ))}
      </ul>
      <div className="grid gap-8 lg:grid-cols-2">
        <ul className="flex flex-col gap-3">
          {sponsorTiers.map((t, i) => (
            <li
              key={t.id}
              className={`flex flex-col gap-4 rounded-xl border p-6 ${i === 0 ? "border-lilac/60 bg-cocoa-2" : "border-line"}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-serif text-2xl">{t.name}</h3>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-sand">{t.slots}</span>
              </div>
              <ul className="grid gap-2 text-[15px] text-cream/90 sm:grid-cols-2">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lilac" aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>
            </li>
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
    <Section id="partners" className="bg-cocoa-2">
      <SectionHead
        eyebrow="Partners"
        title="Hosted by Sections, built with partners"
        body="Six sponsors and partners backed Design Spin-off 2025. Partner announcements for 2027 start soon."
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li className="flex min-h-44 flex-col justify-between gap-6 rounded-xl bg-cream p-6 text-cocoa sm:col-span-2 lg:col-span-2 lg:row-span-2">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cocoa/60">Host</p>
          <div className="flex flex-col gap-3">
            <p className="font-serif text-5xl tracking-tight">Sections</p>
            <p className="max-w-sm leading-relaxed text-cocoa/75">
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
          ["Track partner", "3 slots open"],
          ["Community partner", "Open"],
          ["Media partner", "Open"],
        ].map(([label, slots]) => (
          <li key={label}>
            <a
              href="#sponsor"
              className="flex h-full min-h-44 flex-col justify-between gap-6 rounded-xl border border-dashed border-cream/25 p-6 transition-colors hover:border-lilac hover:bg-cocoa"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-sand">{label}</p>
              <div className="flex flex-col gap-1">
                <p className="font-serif text-2xl">Your brand here</p>
                <p className="text-sm text-lilac">{slots} →</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
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
                <a href="#contact" className="text-cream underline underline-offset-4">
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
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl hover:text-lilac sm:text-2xl">
                {f.q}
                <span
                  aria-hidden
                  className="grid size-8 shrink-0 place-items-center rounded-full border border-line font-sans text-lg transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-sand">{f.a}</p>
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
      <div className="grid gap-12 rounded-2xl border border-line bg-cocoa-2 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <SectionHead
            eyebrow="Contact us"
            title="Talk to the team"
            body="Questions about tickets, speaking, sponsorship or press. We reply within two working days."
          />
          <dl className="flex flex-col gap-5 border-t border-line pt-6 text-[15px]">
            {event.contactEmail ? (
              <div className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Email</dt>
                <dd className="select-all">{event.contactEmail}</dd>
              </div>
            ) : null}
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">Organiser</dt>
              <dd>
                <a
                  href={event.organiserUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-lilac"
                >
                  Sections ↗
                </a>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-sand">City</dt>
              <dd>{event.city}</dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-16 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl font-serif text-5xl leading-[1.02] tracking-tight text-balance sm:text-6xl">
            See you in <em className="text-lilac">Lagos</em>.
          </p>
          <ButtonLink href="#tickets">Register now</ButtonLink>
        </div>
        <div className="flex flex-col gap-6 border-t border-line pt-8 text-sm text-sand md:flex-row md:items-center md:justify-between">
          <Wordmark />
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {[...nav, { href: "#partners", label: "Partners" }, { href: "#contact", label: "Contact" }].map((item) => (
              <a key={item.href} href={item.href} className="hover:text-cream">
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
