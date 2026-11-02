"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { sponsorTiers, tickets, type TicketId } from "./content";
import { buttonClass } from "./primitives";
import { Reveal } from "./reveal";

type Status = "idle" | "sending" | "sent";

// TODO: send submissions to a real backend (form service, CRM or payment
// checkout). Until then forms only confirm on screen and nothing is stored.
async function submitForm(kind: string, data: Record<string, FormDataEntryValue>) {
  void kind;
  void data;
  await new Promise((resolve) => setTimeout(resolve, 600));
}

function useSubmit(kind: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Record<string, string>>({});
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    await submitForm(kind, data);
    setValues(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])));
    setStatus("sent");
  };
  return { status, values, onSubmit, reset: () => setStatus("idle") };
}

const control =
  "w-full rounded-lg border border-line bg-paper px-3 text-[15px] text-ink placeholder:text-muted/70 hover:border-ink/30 focus:border-indigo focus:outline-none";

function Field({
  label,
  name,
  type = "text",
  required = true,
  placeholder,
  autoComplete,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
        {required ? null : <span className="text-muted/70"> (optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${control} h-11`}
      />
    </div>
  );
}

function Select({
  label,
  name,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
      </label>
      <select
        id={id}
        name={name}
        className={`${control} h-11 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%236e6e6e%22 stroke-width=%221.5%22/></svg>')] bg-[right_0.9rem_center] bg-no-repeat pr-9`}
        {...(value !== undefined
          ? { value, onChange: (e) => onChange?.(e.target.value) }
          : { defaultValue: options[0]?.value })}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextArea({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1.5 sm:col-span-2">
      <label htmlFor={id} className="text-[13px] text-muted">
        {label}
      </label>
      <textarea id={id} name={name} required rows={4} placeholder={placeholder} className={`${control} py-2.5`} />
    </div>
  );
}

function SubmitButton({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={status === "sending"}
      className={`${buttonClass("solid")} h-11 disabled:opacity-60`}
    >
      {status === "sending" ? "Sending…" : children}
    </button>
  );
}

function Confirmation({
  title,
  children,
  onReset,
  resetLabel,
}: {
  title: string;
  children: ReactNode;
  onReset: () => void;
  resetLabel: string;
}) {
  return (
    <div
      role="status"
      className="flex flex-col items-start gap-4 rounded-xl border border-indigo/40 bg-mist p-6 sm:p-8"
    >
      <span className="grid size-10 place-items-center rounded-full bg-indigo text-white" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      <h3 className="font-bold tracking-tight text-2xl">{title}</h3>
      <div className="max-w-md leading-relaxed text-muted">{children}</div>
      <button type="button" onClick={onReset} className="text-sm underline underline-offset-4 hover:text-indigo">
        {resetLabel}
      </button>
    </div>
  );
}

/* ---------- Tickets + registration ---------- */

export function TicketsAndRegister() {
  const [tier, setTier] = useState<TicketId>("general");
  const { status, values, onSubmit, reset } = useSubmit("registration");
  const selected = tickets.find((t) => t.id === tier) ?? tickets[1];

  const choose = (id: TicketId) => {
    setTier(id);
    reset();
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3">
        {tickets.map((t, i) => {
          const featured = "featured" in t && t.featured;
          return (
            <Reveal
              as="article"
              key={t.id}
              delay={i * 100}
              className={`flex flex-col gap-6 rounded-xl border p-6 ${
                featured ? "border-indigo/60 bg-mist" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg font-medium">{t.name}</h3>
                {featured ? (
                  <span className="rounded-full bg-indigo px-2.5 py-0.5 text-xs font-medium text-white">
                    Early bird
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-5xl font-bold tracking-tight tabular-nums">{t.price}</p>
                <p className="text-[13px] text-muted">{t.note}</p>
              </div>
              <ul className="flex flex-1 flex-col gap-2.5 border-t border-line pt-5 text-[15px]">
                {t.perks.map((perk) => (
                  <li key={perk} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo" aria-hidden />
                    {perk}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => choose(t.id)}
                className={buttonClass(featured ? "solid" : "outline")}
              >
                Choose {t.name}
              </button>
            </Reveal>
          );
        })}
      </div>

      <div
        id="register"
        className="grid scroll-mt-24 gap-10 rounded-2xl border border-line bg-mist p-6 sm:p-10 lg:grid-cols-[1fr_320px]"
      >
        {status === "sent" ? (
          <Confirmation
            title={`You’re on the list, ${values.firstName || "friend"}.`}
            onReset={reset}
            resetLabel="Register someone else"
          >
            We’ve reserved a <strong className="text-ink">{selected.name}</strong> ticket request for{" "}
            <strong className="text-ink">{values.email}</strong>. Payment details and the confirmed date and venue will
            follow by email.
          </Confirmation>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold tracking-tight text-2xl">Register</h3>
              <p className="text-muted">Reserve your seat now. We’ll email payment details when tickets go live.</p>
            </div>
            <fieldset className="flex flex-col gap-2">
              <legend className="mb-1.5 text-[13px] text-muted">Ticket</legend>
              <div className="grid gap-2 sm:grid-cols-3">
                {tickets.map((t) => (
                  <label
                    key={t.id}
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-[15px] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-indigo ${
                      tier === t.id ? "border-indigo bg-indigo/5" : "border-line hover:border-ink/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="ticket"
                      value={t.id}
                      checked={tier === t.id}
                      onChange={() => setTier(t.id)}
                      className="sr-only"
                    />
                    <span>{t.name}</span>
                    <span className="text-xs text-muted tabular-nums">{t.price}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" autoComplete="given-name" />
              <Field label="Last name" name="lastName" autoComplete="family-name" />
              <Field label="Email" name="email" type="email" autoComplete="email" />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" required={false} />
              <Field label="Role" name="role" placeholder="e.g. Product Designer" autoComplete="organization-title" />
              <Field label="Company or school" name="company" autoComplete="organization" required={false} />
              <Select
                label="How did you hear about us?"
                name="source"
                className="sm:col-span-2"
                options={[
                  { value: "attended-2025", label: "I attended in 2025" },
                  { value: "social", label: "Social media" },
                  { value: "friend", label: "A friend or colleague" },
                  { value: "community", label: "A design community" },
                  { value: "other", label: "Somewhere else" },
                ]}
              />
            </div>
            <label className="flex items-start gap-3 text-sm text-muted">
              <input type="checkbox" name="updates" defaultChecked className="mt-0.5 size-4 accent-indigo" />
              Email me speaker announcements and the confirmed date.
            </label>
            <div>
              <SubmitButton status={status}>Reserve my ticket</SubmitButton>
            </div>
          </form>
        )}

        <aside
          aria-label="Order summary"
          className="flex flex-col gap-5 self-start rounded-xl border border-line bg-paper p-6"
        >
          <p className="text-xs text-muted">Your ticket</p>
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-lg font-medium">{selected.name}</p>
            <p className="font-bold tracking-tight text-3xl tabular-nums">{selected.price}</p>
          </div>
          <ul className="flex flex-col gap-2 border-t border-line pt-4 text-sm text-muted">
            {selected.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
          <p className="border-t border-line pt-4 text-[13px] leading-relaxed text-muted">
            Teams of five or more get 15% off General tickets.{" "}
            <a href="#contact" className="text-ink underline underline-offset-4">
              Ask for an invoice
            </a>
            .
          </p>
        </aside>
      </div>
    </>
  );
}

/* ---------- Sponsorship enquiry ---------- */

export function SponsorForm() {
  const { status, values, onSubmit, reset } = useSubmit("sponsorship");
  if (status === "sent") {
    return (
      <Confirmation title="Thanks, we’ll be in touch." onReset={reset} resetLabel="Send another enquiry">
        The Sections partnerships team will email <strong className="text-ink">{values.email}</strong> with the 2027
        partner deck within two working days.
      </Confirmation>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-line bg-mist p-6 sm:grid-cols-2 sm:p-8">
      <div className="flex flex-col gap-2 sm:col-span-2">
        <h3 className="font-bold tracking-tight text-2xl">Request the partner deck</h3>
        <p className="text-muted">Tell us a little about your company and we’ll send pricing and availability.</p>
      </div>
      <Field label="Full name" name="name" autoComplete="name" />
      <Field label="Work email" name="email" type="email" autoComplete="email" />
      <Field label="Company" name="company" autoComplete="organization" />
      <Select
        label="Interested in"
        name="tier"
        options={[
          ...sponsorTiers.map((t) => ({ value: t.id, label: t.name })),
          { value: "unsure", label: "Not sure yet" },
        ]}
      />
      <TextArea
        label="What would you like to get out of it?"
        name="goals"
        placeholder="Hiring, launches, brand, community…"
      />
      <div className="sm:col-span-2">
        <SubmitButton status={status}>Send enquiry</SubmitButton>
      </div>
    </form>
  );
}

/* ---------- Contact ---------- */

export function ContactForm() {
  const { status, values, onSubmit, reset } = useSubmit("contact");
  if (status === "sent") {
    return (
      <Confirmation title="Message sent." onReset={reset} resetLabel="Write another message">
        Thanks, {values.name || "there"}. We reply within two working days at{" "}
        <strong className="text-ink">{values.email}</strong>.
      </Confirmation>
    );
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <Field label="Name" name="name" autoComplete="name" />
      <Field label="Email" name="email" type="email" autoComplete="email" />
      <Select
        label="Topic"
        name="topic"
        className="sm:col-span-2"
        options={[
          { value: "general", label: "General question" },
          { value: "tickets", label: "Tickets and group bookings" },
          { value: "sponsorship", label: "Sponsorship" },
          { value: "press", label: "Press and media" },
        ]}
      />
      <TextArea label="Message" name="message" />
      <div className="sm:col-span-2">
        <SubmitButton status={status}>Send message</SubmitButton>
      </div>
    </form>
  );
}
