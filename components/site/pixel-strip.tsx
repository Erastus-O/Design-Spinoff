// The pixel-art column that runs down the right edge of the page on desktop,
// after the collage strip in the reference. Bands of mirrored "sprites" are
// generated from a fixed seed, so the server and client draw the same art.

const COLS = 6;
const ROWS = 150;

const PALETTES = [
  ["var(--color-px-lilac)", "var(--color-ink)"],
  ["var(--color-px-green)", "var(--color-ink)"],
  ["var(--color-px-pink)", "var(--color-px-red)"],
  ["var(--color-px-lilac)", "var(--color-px-green)"],
  ["var(--color-px-red)", "var(--color-px-pink)"],
  ["var(--color-indigo)", "var(--color-px-lilac)"],
];

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cells() {
  const rand = rng(2027);
  const out: { x: number; y: number; fill: string }[] = [];
  let y = 0;
  let band = 0;
  while (y < ROWS) {
    const height = 6 + Math.floor(rand() * 10);
    const [a, b] = PALETTES[band % PALETTES.length];
    const half = COLS / 2;
    for (let row = 0; row < height && y + row < ROWS; row++) {
      // Denser towards the middle of each band, so shapes read as sprites.
      const centre = 1 - Math.abs(row / height - 0.5) * 2;
      for (let col = 0; col < half; col++) {
        const r = rand();
        const fill = r < 0.35 + centre * 0.35 ? a : r < 0.55 + centre * 0.3 ? b : null;
        if (!fill) continue;
        out.push({ x: col, y: y + row, fill });
        out.push({ x: COLS - 1 - col, y: y + row, fill });
      }
    }
    y += height + 1 + Math.floor(rand() * 3);
    band++;
  }
  return out;
}

const ART = cells();

export function PixelStrip() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-y-0 right-0 z-30 hidden w-14 border-l border-ink bg-paper lg:block"
    >
      <svg
        viewBox={`0 0 ${COLS} ${ROWS}`}
        preserveAspectRatio="xMidYMin slice"
        shapeRendering="crispEdges"
        className="h-full w-full"
      >
        {ART.map((c, i) => (
          <rect key={i} x={c.x} y={c.y} width="1" height="1" fill={c.fill} />
        ))}
      </svg>
    </div>
  );
}
