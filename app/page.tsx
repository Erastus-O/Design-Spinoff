import Image from "next/image";
import { AfricaScan } from "@/components/site/africa-scan";
import {
  about,
  announcement,
  audience,
  event,
  manifesto,
  nav,
  partnerPackage,
  partnerValue,
  pastStats,
  reach,
  speakers2025,
  tracks2025,
  venue2025,
} from "@/components/site/content";
import { ColorBar, Crosshairs, SectionLabel, Sparkle, Viewfinder, Wordmark } from "@/components/site/primitives";
import audienceQa from "@/public/images/2025-audience-qa.webp";
import conversation from "@/public/images/2025-conversation.webp";
import crowd from "@/public/images/2025-crowd.webp";
import embrace from "@/public/images/2025-embrace.webp";
import host from "@/public/images/2025-host.webp";
import laughter from "@/public/images/2025-laughter.webp";
import mic from "@/public/images/2025-mic.webp";
import panel from "@/public/images/2025-panel.webp";
import venuePhoto from "@/public/images/2025-venue-polygon-hq.webp";

const shell = "relative mx-auto max-w-[1320px] border-x";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Manifesto />
        <About />
        <Tracks />
        <Highlights />
        <Speakers />
        <Venue />
        <Partner />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

function AnnouncementBar() {
  return (
    <div className="bg-orange text-ink">
      <a
        href={event.organiserUrl}
        className="mx-auto flex max-w-[1320px] items-center justify-center gap-3 px-4 py-2.5 text-center text-sm font-medium"
      >
        <span className="hidden rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[11px] text-paper sm:inline">{announcement.label}</span>
        <span>{announcement.text}</span>
        <span aria-hidden className="hidden h-4 w-px bg-ink/30 sm:inline" />
        <span className="hidden whitespace-nowrap underline-offset-4 hover:underline sm:inline">{announcement.cta} →</span>
      </a>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <a href="#top" className="text-[15px] text-ink">
          <Wordmark />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[15px] text-ink/75 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#partner"
          className="rounded-md border border-ink/15 bg-white px-3.5 py-2 text-sm font-semibold text-ink shadow-[0_1px_0_rgba(14,22,32,0.06)] transition-colors hover:border-ink/40"
        >
          Partner with us
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="border-b border-ink/10">
      <div className={`${shell} border-ink/10`}>
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col justify-between gap-12 px-4 pb-10 pt-12 sm:px-8 lg:px-12 lg:pb-12 lg:pt-16">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">
                Annual design conference · by {event.organiser}
              </p>
              <h1 className="mt-6 font-display text-[19vw] uppercase leading-[0.86] tracking-[-0.01em] text-ink sm:text-[15vw] lg:text-[clamp(5rem,8.6vw,8.75rem)]">
                <span className="block">The Design</span>
                <span className="block">Spin–off</span>
                <span className="relative block w-fit text-transparent [-webkit-text-stroke:2px_var(--color-ink)]">
                  {event.edition}
                  <span
                    aria-hidden
                    className="absolute -right-[0.18em] top-[0.06em] -rotate-6 font-hand text-[0.92em] normal-case leading-none tracking-normal text-sun [-webkit-text-stroke:0]"
                  >
                    {event.edition}
                  </span>
                </span>
              </h1>
            </div>

            <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Theme</dt>
                <dd className="mt-1.5 text-2xl font-medium tracking-tight sm:text-3xl">{event.theme}</dd>
                <dd className="mt-1 max-w-md text-ink/65">{event.themeLine}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Date</dt>
                <dd className="mt-1.5 text-lg font-semibold">{event.date}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">Where</dt>
                <dd className="mt-1.5 text-lg font-semibold">{event.city}</dd>
                <dd className="text-sm text-ink/60">{event.venue}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <a
                href={event.organiserUrl}
                className="rounded-lg border-2 border-ink bg-ink px-6 py-3.5 text-base font-semibold text-paper transition-transform hover:-translate-y-0.5"
              >
                Get notified
              </a>
              <a
                href="#partner"
                className="rounded-lg border border-ink/15 bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink/40"
              >
                Become a partner
              </a>
            </div>
          </div>

          <div className="border-t border-ink/10 bg-white px-4 py-8 sm:px-8 lg:border-l lg:border-t-0 lg:p-10">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
              <span>Design Spin-off — host scan</span>
              <span>
                {event.hostCity.lat.toFixed(2)}°N {event.hostCity.lon.toFixed(2)}°E
              </span>
            </div>
            <Viewfinder className="mt-4 p-5 sm:p-8">
              <AfricaScan lat={event.hostCity.lat} lon={event.hostCity.lon} label={event.hostCity.name} />
            </Viewfinder>
            <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">
              <span>54 countries · 1 room</span>
              <span>DSO/{event.edition.slice(2)}</span>
            </div>
          </div>
        </div>
        <ColorBar />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="border-b border-ink/10">
      <div className={`${shell} border-ink/10`}>
        <h2 id="stats-heading" className="sr-only">
          Previous editions in numbers
        </h2>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {pastStats.map((s, i) => (
            <div
              key={s.label}
              className={`border-ink/10 px-4 py-8 sm:px-8 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dd className="font-display text-5xl text-indigo sm:text-6xl">{s.value}</dd>
              <dt className="mt-2 text-sm text-ink/70">{s.label}</dt>
            </div>
          ))}
        </dl>
        <p className="border-t border-ink/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 sm:px-8">
          From previous editions
        </p>
        <div className="rule-strip h-16 border-t border-ink/10 text-ink" />
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-ink text-paper">
      <div className={`${shell} border-paper/10 px-4 py-20 sm:px-8 lg:px-12 lg:py-28`}>
        <Crosshairs tone="paper" />
        <p className="max-w-[18ch] font-display text-[11vw] uppercase leading-[0.95] sm:text-6xl lg:max-w-[22ch] lg:text-7xl">
          <span className="text-orange">{manifesto.lastTime.lead}</span> {manifesto.lastTime.body}
        </p>
        <p className="mt-16 max-w-[18ch] font-display text-[11vw] uppercase leading-[0.95] sm:text-6xl lg:max-w-[22ch] lg:text-7xl">
          <span className="text-orange">{manifesto.next.lead}</span> {manifesto.next.before}
          <span className="relative inline-block">
            {manifesto.next.circled}
            <svg
              aria-hidden
              viewBox="0 0 200 80"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -inset-x-[12%] -inset-y-[18%] h-[136%] w-[124%] text-orange"
            >
              <path
                d="M14 44C10 20 70 8 120 10C170 12 196 26 190 46C184 66 120 74 72 70C30 66 6 56 10 38C14 22 60 12 110 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </span>
          {manifesto.next.after}
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b border-ink/10">
      <div className={`${shell} border-ink/10 grid gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:px-12 lg:py-28`}>
        <Crosshairs />
        <div>
          <SectionLabel index="01">About</SectionLabel>
          <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] text-indigo sm:text-7xl lg:text-8xl">
            About
            <span className="block text-orange">‘The Design Spin–off’</span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-10">
          <p className="text-lg leading-relaxed text-ink/75 sm:text-xl">{about}</p>
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/55">Who’s in the room</h3>
            <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {audience.map((a) => (
                <li key={a} className="flex items-center gap-3 py-3 text-ink">
                  <Sparkle className="size-4 shrink-0 text-indigo" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  return (
    <section id="tracks" className="border-b border-ink/10">
      <div className={`${shell} border-ink/10 px-4 py-20 sm:px-8 lg:px-12 lg:py-28`}>
        <Crosshairs />
        <SectionLabel index="02">The conversations</SectionLabel>
        <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
          <span className="text-indigo">Key</span>{" "}
          <span className="relative inline-block text-orange">
            discussion points
            <span aria-hidden className="absolute -bottom-[0.1em] right-[0.05em] -rotate-6 font-hand text-[0.55em] normal-case text-sun">
              points
            </span>
          </span>
        </h2>
        <p className="mt-6 max-w-xl text-ink/65">
          The 2025 tracks. 2027 tracks are announced with the call for speakers.
        </p>
        <ol className="mt-12 grid border border-ink bg-cream sm:grid-cols-2 lg:grid-cols-4">
          {tracks2025.map((t, i) => (
            <li
              key={t.title}
              className={`flex flex-col gap-6 border-ink p-6 sm:p-8 ${i > 0 ? "border-t" : ""} ${i === 1 ? "sm:border-l sm:border-t-0" : ""} ${i === 3 ? "sm:border-l" : ""} ${i > 0 ? "lg:border-l lg:border-t-0" : ""}`}
            >
              <span className="font-mono text-xs text-ink/50">0{i + 1}</span>
              <h3 className="font-display text-3xl leading-[1.05] tracking-[0.005em]">{t.title}</h3>
              <span className="h-px w-full bg-ink/30" />
              <p className="text-[15px] leading-relaxed text-ink/75">{t.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const gallery = [
  { src: audienceQa, alt: "An attendee asks a question from the floor while photographers film", cls: "col-span-2 row-span-2" },
  { src: panel, alt: "Two panelists in conversation on the Design Spin-off stage", cls: "" },
  { src: crowd, alt: "The audience laughing during a session", cls: "" },
  { src: mic, alt: "A speaker with a microphone addresses the room", cls: "" },
  { src: embrace, alt: "Two attendees embrace in front of the stage backdrop", cls: "" },
  { src: laughter, alt: "Attendees laughing together during networking", cls: "col-span-2" },
  { src: host, alt: "The host speaks from the stage", cls: "" },
  { src: conversation, alt: "Two attendees in conversation", cls: "" },
];

function Highlights() {
  return (
    <section id="highlights" className="bg-ink text-paper">
      <div className={`${shell} border-paper/10 px-4 py-20 sm:px-8 lg:px-12 lg:py-28`}>
        <Crosshairs tone="paper" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="03" tone="paper">
              Design Spin-off 2025 · Intelligent Africa
            </SectionLabel>
            <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              <span className="text-orange">Event</span> highlights
            </h2>
          </div>
          <p className="max-w-sm text-paper/65">
            November 21, 2025 at The Polygon HQ, Lagos. A full room of designers, founders, builders and policy minds.
          </p>
        </div>
        <ul className="mt-12 grid auto-rows-[38vw] grid-cols-2 gap-2 sm:auto-rows-[200px] lg:auto-rows-[220px] lg:grid-cols-4">
          {gallery.map((g) => (
            <li key={g.alt} className={`group relative overflow-hidden bg-ink-2 ${g.cls}`}>
              <Image
                src={g.src}
                alt={g.alt}
                placeholder="blur"
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span aria-hidden className="absolute inset-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-paper" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-paper" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-paper" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-paper" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Speakers() {
  return (
    <section id="speakers" className="border-b border-ink/10">
      <div className={`${shell} border-ink/10 px-4 py-20 sm:px-8 lg:px-12 lg:py-28`}>
        <Crosshairs />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="04">Who’s spoken</SectionLabel>
            <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
              <span className="text-orange">2025</span> speakers
            </h2>
          </div>
          <p className="max-w-sm text-ink/65">The 2027 lineup is being curated now. Want to be on it? Get in touch.</p>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {speakers2025.map((s) => (
            <li key={s.name} className="group overflow-hidden">
              <div className="lattice relative flex aspect-[5/3] items-end p-3 sm:p-5">
                <span className="font-display text-4xl uppercase leading-none text-paper transition sm:text-7xl-transform duration-500 group-hover:-translate-y-1">
                  {s.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
              </div>
              <div className="border-x border-b border-ink/10 bg-white px-3 py-3 sm:px-5 sm:py-4">
                <p className="text-sm font-semibold sm:text-base">{s.name}</p>
                <p className="text-xs text-ink/60 sm:text-sm">
                  {s.role}, {s.org}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="border-b border-ink/10">
      <div className={`${shell} border-ink/10 grid lg:grid-cols-2`}>
        <Crosshairs />
        <div className="px-4 py-20 sm:px-8 lg:px-12 lg:py-28">
          <SectionLabel index="05">2025 venue</SectionLabel>
          <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-7xl">
            <span className="text-orange">The</span> <span className="text-indigo">Polygon HQ</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-ink/75">{venue2025.blurb}</p>
          <p className="mt-8 flex items-center gap-2 font-semibold">
            <span aria-hidden className="inline-block size-2.5 rounded-full bg-orange" />
            {venue2025.address}
          </p>
          <p className="mt-2 text-sm text-ink/55">The 2027 venue will be announced with the date.</p>
        </div>
        <div className="relative min-h-[320px] border-t border-ink/10 lg:border-l lg:border-t-0">
          <Image
            src={venuePhoto}
            alt="Polygon HQ event space with rows of white chairs under a sculpted concrete ceiling"
            placeholder="blur"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Partner() {
  return (
    <section id="partner" className="bg-ink text-paper">
      <div className={`${shell} border-paper/10 px-4 py-20 sm:px-8 lg:px-12 lg:py-28`}>
        <Crosshairs tone="paper" />
        <SectionLabel index="06" tone="paper">
          Partnership & sponsorship
        </SectionLabel>
        <h2 className="mt-6 font-display text-6xl uppercase leading-[0.9] sm:text-7xl lg:text-8xl">
          <span className="text-orange">Partner</span> with us
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/75">
          Partnering with Design Spin-off puts your brand at the centre of Africa’s most forward-thinking conversations on
          AI, design, compliance and fintech.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h3 className="font-display text-3xl">Value for partners</h3>
            <ul className="mt-6 divide-y divide-paper/10 border-y border-paper/10">
              {partnerValue.map((v) => (
                <li key={v.title} className="flex gap-4 py-4">
                  <Sparkle className="mt-1 size-4 shrink-0 text-sun" />
                  <p className="text-paper/75">
                    <strong className="font-semibold text-paper">{v.title}.</strong> {v.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-8">
            <Viewfinder tone="paper" className="bg-ink-2 p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">Exclusive partner package</p>
              <ul className="mt-5 space-y-3">
                {partnerPackage.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-paper/85">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-orange" />
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href={event.organiserUrl}
                className="mt-8 inline-flex rounded-lg bg-orange px-5 py-3 font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                Request the partner deck →
              </a>
            </Viewfinder>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/55">Expected reach (2025)</p>
              <dl className="mt-4 grid grid-cols-3 gap-px bg-paper/10">
                {reach.map((r) => (
                  <div key={r.label} className="bg-ink p-4">
                    <dd className="font-display text-3xl text-indigo sm:text-4xl">{r.value}</dd>
                    <dt className="mt-1 text-xs leading-snug text-paper/65">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-indigo text-paper">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,#7a3cff_0%,transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(14,22,32,0.55)_0%,transparent_50%)]"
      />
      <div className={`${shell} border-paper/15 grid items-end gap-12 px-4 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr] lg:px-12 lg:py-28`}>
        <div>
          <h2 className="font-display text-[15vw] uppercase leading-[0.88] sm:text-8xl lg:text-9xl">
            See you in
            <span className="block text-sun">{event.hostCity.name} ’{event.edition.slice(2)}</span>
          </h2>
          <p className="mt-8 text-xl sm:text-2xl">Let’s design Africa’s future, together.</p>
        </div>
        <a
          href={event.organiserUrl}
          className="group block bg-orange p-8 text-ink transition-transform hover:-translate-y-1"
        >
          <span className="block font-display text-6xl uppercase leading-[0.9]">
            Hello
            <br />
            Sections
          </span>
          <span className="mt-6 block text-sm underline underline-offset-4">hellosections.framer.website</span>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <ColorBar />
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-6 px-4 py-10 sm:px-8 lg:px-12">
        <Wordmark className="text-xl" />
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/50">
          © {event.edition} Design Spin-off · An annual conference by {event.organiser}
        </p>
      </div>
    </footer>
  );
}
