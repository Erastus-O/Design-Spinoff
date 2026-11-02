import type { ReactNode } from "react";

export function Wordmark() {
  return (
    <span className="flex items-baseline gap-2 whitespace-nowrap">
      <span className="font-serif text-[1.35rem] font-medium tracking-tight">Design Spin-off</span>
      <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-sand sm:inline">by Sections</span>
    </span>
  );
}

const sizes = {
  sm: "h-8 px-3 text-[13px]",
  md: "h-10 px-4 text-sm",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  size = "md",
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline";
  size?: keyof typeof sizes;
}) {
  return (
    <a href={href} className={buttonClass(variant, size)}>
      {children}
    </a>
  );
}

export function buttonClass(variant: "solid" | "outline" = "solid", size: keyof typeof sizes = "md") {
  const base = `inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors ${sizes[size]}`;
  return variant === "solid"
    ? `${base} bg-cream text-cocoa hover:bg-white`
    : `${base} border border-cream/35 text-cream hover:border-cream hover:bg-cream/5`;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lilac">{children}</p>;
}

export function SectionHead({
  eyebrow,
  title,
  body,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">{title}</h2>
        {body ? <p className="max-w-xl leading-relaxed text-sand">{body}</p> : null}
      </div>
      {aside}
    </div>
  );
}

export function Section({ id, children, className = "" }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`border-t border-line ${className}`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

export function Draft({ children = "Draft" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex h-6 w-fit shrink-0 items-center rounded-full border border-lilac/40 px-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-lilac">
      {children}
    </span>
  );
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}
