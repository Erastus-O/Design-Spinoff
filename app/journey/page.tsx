import type { Metadata } from "next";
import { homeAnchor, recap2025, routes } from "@/components/site/content";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JourneyCarousel } from "@/components/site/journey-carousel";
import { Section, SectionHead } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Journey · Design Spin-off",
  description: "Design Spin-off 2025 in Lagos: the room, the people, the questions and the numbers.",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export default function JourneyPage() {
  return (
    <>
      <Header />
      <main id="top">
        <section aria-label="Design Spin-off 2025 journey">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 pt-10 pb-20 sm:px-8 md:pt-16 sm:pb-28">
            <a href={homeAnchor("top")} className="w-fit text-sm text-muted hover:text-ink">
              ← Back to Design Spin-off 2027
            </a>
            <JourneyCarousel />
          </div>
        </section>

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

        <Section id="next">
          <div className="flex flex-col gap-8 rounded-xl bg-indigo p-8 text-white sm:p-12 md:flex-row md:items-end md:justify-between">
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
