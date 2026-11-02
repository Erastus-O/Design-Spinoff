import type { Metadata } from "next";
import Image from "next/image";
import { homeAnchor, recap2025, routes, stats2025 } from "@/components/site/content";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Where it started · Design Spin-off",
  description: "Design Spin-off 2025 in Lagos: the room, the people, the questions and the numbers.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export default function WhereItStartedPage() {
  return (
    <>
      <Header />
      <main id="top">
        <section aria-labelledby="recap-title">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pt-12 pb-16 sm:px-8 md:pt-20">
            <a href={homeAnchor("top")} className="w-fit text-sm text-muted hover:text-ink">
              ← Back to Design Spin-off 2027
            </a>
            <p className="text-[15px] text-muted">Where it started</p>
            <h1
              id="recap-title"
              className="max-w-3xl text-[2.4rem] leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]"
            >
              Design Spin-off 2025, Lagos
            </h1>
            <p className="max-w-2xl text-[17px] leading-relaxed text-muted">{recap2025.intro}</p>
          </div>
        </section>

        <section aria-label="Photos from Design Spin-off 2025">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-5 sm:px-8 md:grid-cols-4">
            {recap2025.photos.map((p, i) => (
              <Reveal
                key={p.src}
                delay={(i % 4) * 80}
                className="relative aspect-[4/3] max-w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  priority={i < 2}
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
        </section>

        <Section id="numbers">
          <SectionHead eyebrow="In numbers" title="One room, a long reach" />
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats2025.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="flex flex-col gap-1">
                <dd className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl">{s.value}</dd>
                <dt className="text-sm text-muted">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </Section>

        <Section id="tracks" className="bg-mist">
          <SectionHead eyebrow="The question" title={recap2025.question} body="Four tracks shaped the day." />
          <ul className="grid gap-3 sm:grid-cols-2">
            {recap2025.tracks.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 90} className="flex flex-col gap-3 rounded-2xl bg-paper p-7">
                <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted">{t.body}</p>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="speakers-2025">
          <SectionHead eyebrow="On stage" title="The 2025 speakers" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
            {recap2025.speakers.map((s, i) => (
              <Reveal as="li" key={s.name} delay={(i % 4) * 80} className="flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-mist text-sm font-semibold"
                >
                  {initials(s.name)}
                </span>
                <div className="flex min-w-0 flex-col">
                  <p className="font-semibold">{s.name}</p>
                  <p className="text-sm text-muted">
                    {s.role}, {s.org}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>

        <Section id="venue-2025" className="bg-mist">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative aspect-[3/2] max-w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/2025-venue-polygon-hq.webp"
                alt="Rows of chairs set out inside The Polygon HQ"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[15px] text-muted">The venue</p>
              <h2 className="text-3xl leading-[1.15] font-bold tracking-tight sm:text-[2.6rem]">
                {recap2025.venue.name}
              </h2>
              <p className="text-sm text-muted">{recap2025.venue.address}</p>
              <p className="leading-relaxed text-muted">{recap2025.venue.blurb}</p>
            </div>
          </div>
        </Section>

        <Section id="next">
          <div className="flex flex-col gap-8 rounded-3xl bg-indigo p-8 text-white sm:p-12 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <p className="text-[15px] text-white/70">Next</p>
              <h2 className="text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-[2.6rem]">
                In 2027, Design Spin-off comes to London
              </h2>
              <p className="leading-relaxed text-white/80">
                Five topics, a curated lineup of UK speakers and one day at Design District.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={routes.tickets}
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-medium whitespace-nowrap text-indigo transition-colors hover:bg-white/90"
              >
                Register
              </a>
              <a
                href={homeAnchor("top")}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/40 px-8 text-sm font-medium whitespace-nowrap text-white transition-colors hover:border-white"
              >
                See the 2027 event
              </a>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
