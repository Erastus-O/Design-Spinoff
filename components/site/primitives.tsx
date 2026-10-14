import type { ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-[0.82] ${className}`} aria-label="Design Spin-off by Sections">
      <span className="font-wide text-[1.05em] font-extrabold tracking-[-0.01em] [font-stretch:125%]">DESIGN</span>
      <span className="font-wide text-[1.05em] font-extrabold tracking-[-0.01em] [font-stretch:125%]">SPIN-OFF</span>
      <span className="mt-[0.3em] text-center font-mono text-[0.32em] tracking-[0.6em] opacity-70">BY SECTIONS</span>
    </span>
  );
}

/** Four-point star used as the bullet throughout the 2025 deck. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 0C12.8 7.2 16.8 11.2 24 12C16.8 12.8 12.8 16.8 12 24C11.2 16.8 7.2 12.8 0 12C7.2 11.2 11.2 7.2 12 0Z" fill="currentColor" />
    </svg>
  );
}

/** Camera-viewfinder corner brackets around a block. */
export function Viewfinder({ children, className = "", tone = "ink" }: { children: ReactNode; className?: string; tone?: "ink" | "paper" }) {
  const c = tone === "ink" ? "border-ink" : "border-paper";
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className={`absolute -left-px -top-px h-5 w-5 border-l-2 border-t-2 ${c}`} />
      <span aria-hidden className={`absolute -right-px -top-px h-5 w-5 border-r-2 border-t-2 ${c}`} />
      <span aria-hidden className={`absolute -bottom-px -left-px h-5 w-5 border-b-2 border-l-2 ${c}`} />
      <span aria-hidden className={`absolute -bottom-px -right-px h-5 w-5 border-b-2 border-r-2 ${c}`} />
      {children}
    </div>
  );
}

/** "+" registration marks pinned to the top corners of a section. */
export function Crosshairs({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  const c = tone === "ink" ? "text-ink/40" : "text-paper/40";
  return (
    <>
      <span aria-hidden className={`pointer-events-none absolute hidden xl:block -left-[7px] -top-[11px] font-mono text-sm ${c}`}>+</span>
      <span aria-hidden className={`pointer-events-none absolute hidden xl:block -right-[7px] -top-[11px] font-mono text-sm ${c}`}>+</span>
    </>
  );
}

export function ColorBar({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex h-1.5 w-full ${className}`}>
      <span className="flex-[3] bg-orange" />
      <span className="flex-[2] bg-sun" />
      <span className="flex-[2] bg-teal" />
      <span className="flex-[2] bg-pink" />
      <span className="flex-[3] bg-indigo" />
    </div>
  );
}

export function SectionLabel({ index, children, tone = "ink" }: { index: string; children: ReactNode; tone?: "ink" | "paper" }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] ${tone === "ink" ? "text-ink/60" : "text-paper/60"}`}>
      <span>{index}</span>
      <span className={`h-px w-8 ${tone === "ink" ? "bg-ink/30" : "bg-paper/30"}`} />
      <span>{children}</span>
    </p>
  );
}
