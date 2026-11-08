"use client";

import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Variant = "drop" | "rise";

/**
 * Plays an entrance when the element first scrolls into view: "drop" falls in
 * from above like the hero's topic blocks, "rise" lifts in from below.
 * Elements already on screen at load, and visitors who prefer reduced motion,
 * see the content as-is, so nothing is hidden waiting for an observer.
 */
export function Reveal({
  as = "div",
  variant = "rise",
  delay = 0,
  className = "",
  style,
  children,
  ...rest
}: {
  as?: "div" | "li" | "span" | "article";
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  "aria-hidden"?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"static" | "armed" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const motion = state === "armed" ? "reveal-armed" : state === "shown" ? `reveal-${variant}` : "";
  return createElement(
    as,
    {
      ref,
      className: `${className} ${motion}`,
      style: state === "shown" ? { ...style, animationDelay: `${delay}ms` } : style,
      ...rest,
    },
    children,
  );
}
