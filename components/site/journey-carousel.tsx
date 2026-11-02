"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { journeyCards } from "./content";

/**
 * Title and headline number on the left; a horizontal, snap-scrolling row of
 * cards on the right that bleeds off the edge of the page. The number and the
 * dots follow whichever card is first in view.
 */
export function JourneyCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const step = useCallback(() => {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return 1;
    return card.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      // At the far end, light the last dot even if the last card can't reach the start.
      const i = el.scrollLeft >= max - 4 ? journeyCards.length - 1 : Math.round(el.scrollLeft / step());
      setActive(Math.min(Math.max(i, 0), journeyCards.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [step]);

  const go = (i: number) => {
    const target = Math.min(Math.max(i, 0), journeyCards.length - 1);
    scroller.current?.scrollTo({ left: target * step(), behavior: "smooth" });
    setActive(target);
  };

  const stat = journeyCards[active].stat;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:gap-x-14 lg:gap-y-8">
      <div className="flex flex-col gap-4 lg:col-start-1 lg:row-start-1">
        <p className="text-[15px] text-muted">Journey</p>
        <h1 className="text-[2.2rem] leading-[1.12] font-normal tracking-tight text-balance sm:text-[2.6rem]">
          Where it started: Lagos, 2025
        </h1>
        <p className="leading-relaxed text-muted">
          The first Design Spin-off asked how we design for an AI-powered Africa. Scroll through the day.
        </p>
      </div>

      <div className="flex flex-col gap-5 lg:col-start-1 lg:row-start-2">
        <div aria-live="polite" className="flex flex-col gap-1">
          <p key={`v-${active}`} className="reveal-rise text-6xl font-light tracking-tight tabular-nums sm:text-7xl">
            {stat.value}
          </p>
          <p key={`l-${active}`} className="reveal-rise text-sm text-muted">
            {stat.label}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Journey cards">
            {journeyCards.map((card, i) => (
              <button
                key={card.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${i + 1} of ${journeyCards.length}: ${card.title}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-ink" : "w-1.5 bg-ink/25 hover:bg-ink/50"
                }`}
              />
            ))}
          </div>
          <div className="ml-auto flex gap-2 lg:ml-0">
            {[
              ["Previous card", -1, "M10 3 5 8l5 5"],
              ["Next card", 1, "m6 3 5 5-5 5"],
            ].map(([label, dir, path]) => (
              <button
                key={label as string}
                type="button"
                aria-label={label as string}
                onClick={() => go(active + (dir as number))}
                disabled={(dir === -1 && active === 0) || (dir === 1 && active === journeyCards.length - 1)}
                className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-ink/40 disabled:opacity-30"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d={path as string} stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The row runs past the container to the page edge, like the reference. */}
      <div className="-mr-5 min-w-0 sm:-mr-8 max-lg:row-start-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mr-[calc(min(0px,(72rem_-_100vw)/2)_-_2rem)]">
        <div
          ref={scroller}
          tabIndex={0}
          aria-label="2025 journey, scroll sideways"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pr-5 pb-2 [scrollbar-width:none] sm:pr-8 [&::-webkit-scrollbar]:hidden"
        >
          {journeyCards.map((card, i) => (
            <article
              key={card.title}
              data-card
              className="flex w-[17rem] shrink-0 snap-start flex-col rounded-2xl bg-mist sm:w-[20rem]"
            >
              <div className="relative m-3 h-[17rem] overflow-hidden rounded-xl sm:h-[20rem]">
                <Image
                  src={card.photo.src}
                  alt={card.photo.alt}
                  fill
                  priority={i < 3}
                  sizes="20rem"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="flex flex-col gap-1.5 px-5 pt-2 pb-6">
                <h2 className="text-[15px] font-semibold tracking-tight">{card.title}</h2>
                <p className="text-[13px] leading-relaxed text-muted">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
