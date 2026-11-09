import type { Metadata } from "next";
import { homeAnchor, routes } from "@/components/site/content";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { JourneyCarousel } from "@/components/site/journey-carousel";
import { Section } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Journey · Design Spin-off",
  description: "Design Spin-off 2025 in Lagos: the room, the people, the questions and the numbers.",
};

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
