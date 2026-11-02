import type { Metadata } from "next";
import { event, homeAnchor } from "@/components/site/content";
import { Footer } from "@/components/site/footer";
import { TicketsAndRegister } from "@/components/site/forms";
import { Header } from "@/components/site/header";
import { Draft } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Tickets · Design Spin-off 2027",
  description: "Choose a ticket and register for Design Spin-off 2027 at Design District, London.",
};

export default function TicketsPage() {
  return (
    <>
      <Header />
      <main id="top">
        <section aria-labelledby="tickets-title">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 pt-12 pb-4 sm:px-8 md:pt-20">
            <a href={homeAnchor("top")} className="w-fit text-sm text-muted hover:text-ink">
              ← Back to the event
            </a>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="flex max-w-2xl flex-col gap-4">
                <p className="text-[15px] text-muted">Tickets</p>
                <h1
                  id="tickets-title"
                  className="text-[2.4rem] leading-[1.12] font-bold tracking-tight text-balance sm:text-5xl"
                >
                  Pick your seat
                </h1>
                <p className="max-w-xl leading-relaxed text-muted">
                  Prices include VAT and lunch. Early-bird General tickets are limited.
                </p>
              </div>
              <Draft>Draft pricing</Draft>
            </div>
            <dl className="grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
              {[
                ["When", event.date],
                ["Where", event.city],
                ["Format", event.format],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col gap-1">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section id="tickets">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 pt-10 pb-20 sm:px-8 sm:pb-28">
            <TicketsAndRegister />
            <p className="text-sm text-muted">
              Questions about refunds, transfers or group bookings?{" "}
              <a href={homeAnchor("faqs")} className="text-ink underline underline-offset-4">
                Read the FAQs
              </a>{" "}
              or{" "}
              <a href={homeAnchor("contact")} className="text-ink underline underline-offset-4">
                contact us
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
