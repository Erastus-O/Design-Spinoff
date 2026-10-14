import { Bend } from "@/components/ui/bend";

const items = Array.from({ length: 40 }, (_, i) => i + 1);

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-4 py-12">
      <header>
        <h1 className="text-2xl font-semibold">Bend</h1>
        <p className="text-sm opacity-70">
          Scroll the panel. The top and bottom edges fold away in browsers
          that support HTML-in-canvas; elsewhere it scrolls normally.
        </p>
      </header>
      <Bend
        zone={120}
        angle={65}
        rounding={150}
        perspective={1000}
        ease={240}
        smoothing={0.23}
        tumble={0.5}
        tilt={0.5}
        direction="in"
        top
        bottom
        className="h-[600px] overflow-hidden rounded-xl border border-black/10 dark:border-white/10"
      >
        <div className="bg-[var(--background)] p-6">
          {items.map((n) => (
            <article
              key={n}
              className="mb-4 rounded-lg border border-black/10 p-4 transition-colors hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              <h2 className="font-medium">Item {n}</h2>
              <p className="text-sm opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>
          ))}
        </div>
      </Bend>
    </main>
  );
}
