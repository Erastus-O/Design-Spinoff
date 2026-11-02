import type { ReactNode } from "react";
import { Burst, type BurstVariant } from "./burst";
import { topics, type TopicId } from "./content";

export function Wordmark({ className = "h-9" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/design-spin-off-logo.png"
      alt="Design Spin-off by Sections"
      width={301}
      height={84}
      className={`w-auto ${className}`}
    />
  );
}

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-8 text-sm",
};

export function buttonClass(variant: "solid" | "outline" = "solid", size: keyof typeof sizes = "md") {
  const base = `inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors ${sizes[size]}`;
  return variant === "solid"
    ? `${base} bg-indigo text-white hover:bg-indigo-dark`
    : `${base} border border-ink/15 text-ink hover:border-ink/40`;
}

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

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[15px] text-muted">{children}</p>;
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
        <h2 className="text-3xl leading-[1.15] font-bold tracking-tight text-balance sm:text-[2.6rem]">{title}</h2>
        {body ? <p className="max-w-xl leading-relaxed text-muted">{body}</p> : null}
      </div>
      {aside}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
  burst,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  burst?: BurstVariant;
}) {
  return (
    <section id={id} className={burst ? `relative isolate overflow-hidden ${className}` : className}>
      {burst ? <Burst variant={burst} /> : null}
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 sm:px-8 sm:py-28">{children}</div>
    </section>
  );
}

export function Draft({ children = "Draft" }: { children?: ReactNode }) {
  return (
    <span className="inline-flex h-7 w-fit shrink-0 items-center rounded-full bg-mist px-3 text-xs text-muted">
      {children}
    </span>
  );
}

export function topicById(id: TopicId) {
  return topics.find((t) => t.id === id)!;
}

/** A small solid block in the topic's colour, echoing the hero stack. */
export function TopicChip({ id }: { id: TopicId }) {
  const t = topicById(id);
  return (
    <span className="inline-flex w-fit items-center gap-2 text-[13px] text-muted">
      <span aria-hidden className="h-3 w-5" style={{ background: t.color }} />
      {t.name}
    </span>
  );
}
