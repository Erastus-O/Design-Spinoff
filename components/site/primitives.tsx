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
