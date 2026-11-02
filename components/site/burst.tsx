// Decorative background: stepped rays bursting from a point, after the
// reference artwork, drawn in soft grey and lilac. Each ray is a stack of
// annular sectors that shift slightly at set radii, which gives the notched
// edges. The geometry is fixed per `variant`, so server and client agree.

const W = 1200;
const H = 736;

type Ray = { angle: number; width: number; shift: number };

// Ray directions (degrees, 0 = right, clockwise), widths and how far each
// step rotates the ray. Irregular on purpose, like the reference.
const RAYS: Ray[] = [
  { angle: -90, width: 17, shift: 7 },
  { angle: -40, width: 18, shift: -7 },
  { angle: 2, width: 15, shift: 6 },
  { angle: 52, width: 17, shift: -6 },
  { angle: 98, width: 16, shift: 7 },
  { angle: 140, width: 20, shift: -8 },
  { angle: 196, width: 17, shift: 7 },
  { angle: 228, width: 19, shift: -7 },
];

// Radii where the rays step, as fractions of the canvas diagonal.
const STEPS = [0, 0.22, 0.38, 1];

const variants = {
  a: { cx: 0.5, cy: 0.5, turn: 0 },
  b: { cx: 0.78, cy: 0.62, turn: 17 },
  c: { cx: 0.2, cy: 0.42, turn: -23 },
  d: { cx: 0.55, cy: 0.9, turn: 33 },
} as const;

export type BurstVariant = keyof typeof variants;

function point(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
}

function sector(cx: number, cy: number, r0: number, r1: number, a0: number, a1: number) {
  const large = a1 - a0 > 180 ? 1 : 0;
  const outer = `M${point(cx, cy, r1, a0)} A${r1} ${r1} 0 ${large} 1 ${point(cx, cy, r1, a1)}`;
  if (r0 === 0) return `${outer} L${cx} ${cy}Z`;
  return `${outer} L${point(cx, cy, r0, a1)} A${r0} ${r0} 0 ${large} 0 ${point(cx, cy, r0, a0)}Z`;
}

export function Burst({ variant = "a", className = "" }: { variant?: BurstVariant; className?: string }) {
  const v = variants[variant];
  const cx = v.cx * W;
  const cy = v.cy * H;
  const reach = Math.hypot(W, H);
  const d = RAYS.flatMap((ray) =>
    STEPS.slice(0, -1).map((r, k) => {
      const start = ray.angle + v.turn + (k % 2 ? ray.shift : 0);
      // Rays widen a little at each step, like the reference.
      const width = ray.width + k * 1.5;
      return sector(cx, cy, r * reach, STEPS[k + 1] * reach, start, start + width);
    }),
  ).join(" ");

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full ${className}`}
    >
      <rect width={W} height={H} fill="var(--color-burst-grey)" />
      <path d={d} fill="var(--color-burst-lilac)" />
    </svg>
  );
}
