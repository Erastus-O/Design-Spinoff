"use client";

import { useEffect, useRef, useState } from "react";

// Coarse outline of Africa and Madagascar as [lon, lat]. Only needs to read
// as the continent once rasterised into a dot matrix.
const MAINLAND: [number, number][] = [
  [-5.8, 35.8], [3, 36.8], [10.2, 37.2], [11, 36.9], [10, 33.9], [13.2, 32.9],
  [16.6, 31.2], [20, 32.1], [24, 32], [29.9, 31.2], [32.3, 31.3], [32.5, 29.9],
  [34, 27], [35.5, 24], [37.2, 21], [38.5, 18], [39.7, 15.5], [41.5, 13.8],
  [43.3, 12.5], [44, 10.5], [45, 10.4], [48, 11.2], [51.3, 11.8], [51, 10],
  [49.5, 6.5], [48, 4.5], [46, 2], [43, -0.5], [41.5, -1.8], [40, -3],
  [39.3, -6], [39.5, -8], [40.4, -10.5], [40.6, -14], [39.5, -16.5], [37, -18],
  [35, -20.5], [35.5, -23], [35, -24.5], [32.9, -26], [32.5, -28.5], [31, -29.9],
  [28, -32.7], [25.6, -34], [22, -34.2], [20, -34.8], [18.4, -34], [18, -32.5],
  [17, -29], [15.2, -27], [14.5, -23], [12, -18], [11.8, -16.5], [12.5, -13],
  [13.7, -10.5], [13, -8.5], [12.2, -6], [11.8, -4.5], [9.5, -2], [9, 0],
  [9.6, 3], [8.7, 4.4], [6, 4.3], [4, 6.4], [1, 6], [-2, 4.8], [-4.5, 5.2],
  [-7.5, 4.4], [-9.5, 5.5], [-12, 7.5], [-13.3, 9], [-15, 11], [-16.7, 12.4],
  [-17.4, 14.7], [-16.5, 16.5], [-16, 19], [-17, 21], [-16, 23.5], [-14.5, 26],
  [-13, 27.6], [-10, 29], [-9.6, 30.5], [-9.3, 32.5], [-8, 33.6], [-6.8, 34],
];
const MADAGASCAR: [number, number][] = [
  [49.3, -12], [50.4, -15.5], [49.5, -17], [47.5, -24.5], [45, -25.5],
  [43.7, -23.5], [44, -20], [44.4, -16.3], [46.5, -15.5], [48, -13.5],
];

const LON: [number, number] = [-20, 54];
const LAT: [number, number] = [-37, 39];
const STEP = 1.55;

const COLORS = ["#FF9550", "#5A67FF", "#FFB627", "#F38BB0", "#3FB8AF", "#0E1620"];

function inside(poly: [number, number][], x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

type Dot = { x: number; y: number; land: boolean; color: string; size: number; delay: number };

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.round((LON[1] - LON[0]) / STEP);
  const rows = Math.round((LAT[1] - LAT[0]) / STEP);
  for (let r = 0; r <= rows; r++) {
    for (let c = 0; c <= cols; c++) {
      const lon = LON[0] + c * STEP;
      const lat = LAT[1] - r * STEP;
      const land = inside(MAINLAND, lon, lat) || inside(MADAGASCAR, lon, lat);
      // Smooth banding so colours cluster like strata instead of confetti.
      const n = Math.sin(r * 0.42 + Math.sin(c * 0.21) * 1.6) + Math.sin((c + r) * 0.13) * 0.6;
      const idx = Math.abs(Math.floor(n * 2.2 + 3)) % COLORS.length;
      const jitter = Math.abs(Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
      dots.push({
        x: c / cols,
        y: r / rows,
        land,
        color: COLORS[idx],
        size: land ? 0.72 + jitter * 0.28 : 0.22,
        delay: jitter * 0.12,
      });
    }
  }
  return dots;
}

export const hostPosition = (lon: number, lat: number) => ({
  left: ((lon - LON[0]) / (LON[1] - LON[0])) * 100,
  top: ((LAT[1] - lat) / (LAT[1] - LAT[0])) * 100,
});

export function AfricaScan({ lat, lon, label }: { lat: number; lon: number; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const host = hostPosition(lon, lat);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dots = buildDots();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = 2600;
    let start = 0;
    let frame = 0;

    const draw = (p: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const pitch = w / ((LON[1] - LON[0]) / STEP);
      const scan = p * 1.15;
      for (const d of dots) {
        const t = Math.min(Math.max((scan - d.y - d.delay) / 0.08, 0), 1);
        if (d.land && t === 0) continue;
        const r = (pitch / 2) * 0.8 * d.size * (d.land ? t : 1);
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, r, 0, Math.PI * 2);
        ctx.fillStyle = d.land ? d.color : "rgba(14,22,32,0.14)";
        ctx.fill();
      }
      if (p < 1) {
        const y = Math.min(scan, 1) * h;
        ctx.fillStyle = "rgba(90,103,255,0.9)";
        ctx.fillRect(0, y, w, 1);
      }
    };

    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      draw(p);
      setProgress(p);
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    if (reduce) {
      draw(1);
      setProgress(1);
    } else {
      frame = requestAnimationFrame(tick);
    }
    const ro = new ResizeObserver(() => draw(start ? Math.min((performance.now() - start) / duration, 1) : reduce ? 1 : 0));
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  const done = progress >= 1;

  return (
    <div className="relative aspect-[74/76] w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Dot-matrix map of Africa with ${label} marked as host city`}
      />
      {/* Reticle travels from the centre of the continent to the host city. */}
      <div
        aria-hidden
        className="absolute size-[18%] -translate-x-1/2 -translate-y-1/2 transition-[left,top,opacity] duration-[1400ms] ease-[cubic-bezier(.2,.8,.2,1)]"
        style={{
          left: `${done ? host.left : 48}%`,
          top: `${done ? host.top : 50}%`,
          opacity: progress > 0.15 ? 1 : 0,
        }}
      >
        <span className="absolute left-0 top-0 h-4 w-4 border-l-[3px] border-t-[3px] border-ink" />
        <span className="absolute right-0 top-0 h-4 w-4 border-r-[3px] border-t-[3px] border-ink" />
        <span className="absolute bottom-0 left-0 h-4 w-4 border-b-[3px] border-l-[3px] border-ink" />
        <span className="absolute bottom-0 right-0 h-4 w-4 border-b-[3px] border-r-[3px] border-ink" />
        <span className="absolute inset-[14%] bg-white/35 ring-1 ring-ink/20" />
        <span className="absolute left-1/2 top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink ring-4 ring-white" />
        <span
          className={`absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap bg-ink px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-paper transition-opacity delay-[1200ms] duration-500 ${done ? "opacity-100" : "opacity-0"}`}
        >
          {label} · host city
        </span>
      </div>
      <p className="absolute bottom-0 left-0 font-sans text-sm text-ink" aria-live="polite">
        {done ? "Host city locked" : `Scanning ${Math.round(progress * 100)}%`}
      </p>
    </div>
  );
}
