import { AfricaScan } from "@/components/site/africa-scan";
import { announcement, event } from "@/components/site/content";
import { ColorBar, Viewfinder, Wordmark } from "@/components/site/primitives";

const shell = "relative mx-auto max-w-[1320px] border-x";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
    </div>
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
        <a href="/" className="text-[15px] text-ink">
          <Wordmark />
        </a>
        <a
          href={event.organiserUrl}
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
    <section className="flex flex-1 flex-col border-b border-ink/10">
      <div className={`${shell} flex w-full flex-1 flex-col border-ink/10`}>
        <div className="grid flex-1 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col justify-between gap-10 px-4 pb-10 pt-10 sm:px-8 lg:px-12 lg:pb-10 lg:pt-12">
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
                href={event.organiserUrl}
                className="rounded-lg border border-ink/15 bg-white px-6 py-3.5 text-base font-semibold text-ink transition-colors hover:border-ink/40"
              >
                Become a partner
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center border-t border-ink/10 bg-white px-4 py-8 sm:px-8 lg:border-l lg:border-t-0 lg:p-10">
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
