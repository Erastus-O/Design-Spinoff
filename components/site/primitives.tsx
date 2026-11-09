import type { ReactNode } from "react";
import { topics, type TopicId } from "./content";

/**
 * The Design Spin-off logo. `badge` sets it white in the black speech-bubble
 * badge used across the 2027 campaign artwork.
 */
export function Wordmark({ className = "h-9", badge = false }: { className?: string; badge?: boolean }) {
  const logo = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/design-spin-off-logo.png"
      alt="Design Spin-off by Sections"
      width={301}
      height={84}
      className={badge ? "h-full w-auto invert" : `w-auto ${className}`}
    />
  );
  if (!badge) return logo;
  return (
    <span className={`relative inline-flex items-center rounded-[10px] bg-ink px-3 py-1.5 ${className}`}>
      {logo}
      <span aria-hidden className="absolute -bottom-1 left-1/2 size-2.5 -translate-x-1/2 rotate-45 bg-ink" />
    </span>
  );
}

/** The thin multicolour rule from the campaign artwork: one segment per topic. */
export function TopicRule({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex h-[3px] w-full ${className}`}>
      {topics.map((t) => (
        <span key={t.id} className="flex-1" style={{ background: t.color }} />
      ))}
    </span>
  );
}

const sizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-12 px-8 text-sm",
};

export function buttonClass(variant: "solid" | "outline" = "solid", size: keyof typeof sizes = "md") {
  const base = `inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors ${sizes[size]}`;
  return variant === "solid"
    ? `${base} bg-ink text-white hover:bg-ink/80`
    : `${base} border border-ink text-ink hover:bg-ink hover:text-white`;
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

/** Small grey label with a square bullet, as on the reference's section heads. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[13px] text-muted">
      <span aria-hidden className="size-1.5 bg-ink" />
      {children}
    </p>
  );
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
        <h2 className="text-4xl leading-[1.02] font-semibold tracking-[-0.022em] text-balance sm:text-[3.4rem]">
          {title}
        </h2>
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
  rule = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  /** The thin rule above the section; off where the section follows the partner strip. */
  rule?: boolean;
}) {
  return (
    <section id={id} className={className}>
      <div
        className={`mx-auto flex max-w-6xl flex-col gap-12 px-5 py-20 sm:px-8 sm:py-24 ${rule ? "border-t border-line" : ""}`}
      >
        {children}
      </div>
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
