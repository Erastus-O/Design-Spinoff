// Illustrated panel stage: the 2025 tunnel-lattice backdrop and speech-bubble
// sign, two lounge chairs, a side table with the yellow keke, and mic stands.

const INK = "#0e1620";
const GOLD = "#d9a441";

function Chair({ x, cushion }: { x: number; cushion: string }) {
  return (
    <g transform={`translate(${x} 432)`}>
      <rect x={-42} y={-10} width={7} height={12} rx={2} fill={INK} />
      <rect x={35} y={-10} width={7} height={12} rx={2} fill={INK} />
      <path d="M-64 -12 C-72 -74 -58 -134 0 -136 C58 -134 72 -74 64 -12 Z" fill="#fff" stroke={INK} strokeWidth={2.5} />
      <path d="M-44 -44 C-48 -86 -36 -116 0 -118 C36 -116 48 -86 44 -44 Z" fill={cushion} stroke={INK} strokeWidth={2} />
      <rect x={-52} y={-58} width={104} height={24} rx={12} fill={cushion} stroke={INK} strokeWidth={2} />
      <rect x={-64} y={-38} width={128} height={28} rx={13} fill="#fff" stroke={INK} strokeWidth={2.5} />
    </g>
  );
}

function MicStand({ x, dir }: { x: number; dir: 1 | -1 }) {
  return (
    <g stroke={INK} strokeLinecap="round">
      <line x1={x} y1={432} x2={x} y2={296} strokeWidth={3} />
      <line x1={x} y1={428} x2={x - 14} y2={436} strokeWidth={2.5} />
      <line x1={x} y1={428} x2={x + 14} y2={436} strokeWidth={2.5} />
      <line x1={x} y1={298} x2={x + 30 * dir} y2={282} strokeWidth={2.5} />
      <ellipse cx={x + 36 * dir} cy={279} rx={8} ry={4.5} fill={INK} transform={`rotate(${-28 * dir} ${x + 36 * dir} 279)`} />
    </g>
  );
}

export function PanelStage() {
  const rings = Array.from({ length: 11 }, (_, i) => i + 1);
  const spokes = Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24);

  return (
    <svg
      viewBox="0 0 640 600"
      role="img"
      aria-label="Illustrated panel stage with two empty lounge chairs, a side table and microphones in front of the Design Spin-off backdrop"
      className="h-auto w-full max-w-full"
    >
      <defs>
        <clipPath id="arch">
          <path d="M80 424 V176 A240 156 0 0 1 560 176 V424 Z" />
        </clipPath>
        <radialGradient id="depth" cx="50%" cy="58%" r="55%">
          <stop offset="0" stopColor="#b9b2ff" />
          <stop offset="0.35" stopColor="#5a67ff" />
          <stop offset="1" stopColor="#3b3fd6" />
        </radialGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <ellipse cx={320} cy={512} rx={300} ry={14} fill={INK} opacity={0.07} />

      {/* Backdrop: tunnel lattice inside an arch */}
      <g clipPath="url(#arch)">
        <rect x={0} y={0} width={640} height={600} fill="url(#depth)" />
        <g fill="none" stroke="#ffb627" strokeWidth={2} opacity={0.9}>
          {rings.map((k) => (
            <ellipse key={k} cx={320} cy={318} rx={k * k * 4.2 + 14} ry={k * k * 2.6 + 9} />
          ))}
          {spokes.map((a) => (
            <line key={a} x1={320} y1={318} x2={320 + Math.cos(a) * 640} y2={318 + Math.sin(a) * 400} />
          ))}
        </g>
        <g className="stage-beam" style={{ transformOrigin: "190px -10px" }}>
          <polygon points="184,-10 196,-10 270,424 110,424" fill="url(#beam)" />
        </g>
        <g className="stage-beam stage-beam--late" style={{ transformOrigin: "450px -10px" }}>
          <polygon points="444,-10 456,-10 530,424 370,424" fill="url(#beam)" />
        </g>
      </g>
      <path d="M80 424 V176 A240 156 0 0 1 560 176 V424" fill="none" stroke={INK} strokeWidth={2.5} />

      {/* Speech-bubble sign */}
      <g transform="translate(352 64)">
        <path d="M14 0 H176 A14 14 0 0 1 190 14 V66 A14 14 0 0 1 176 80 H62 L30 102 L36 80 H14 A14 14 0 0 1 0 66 V14 A14 14 0 0 1 14 0 Z" fill="#fff" stroke={INK} strokeWidth={2.5} />
        <text x={95} y={38} textAnchor="middle" fill={INK} style={{ font: "800 25px var(--font-archivo), sans-serif", fontStretch: "125%" }}>
          DESIGN
        </text>
        <text x={95} y={64} textAnchor="middle" fill={INK} style={{ font: "800 25px var(--font-archivo), sans-serif", fontStretch: "125%" }}>
          SPIN-OFF
        </text>
      </g>

      {/* Riser: top face and colour-bar front */}
      <polygon points="40,424 600,424 620,448 20,448" fill="#f4f2ee" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <rect x={20} y={448} width={150} height={34} fill="#ff9550" />
      <rect x={170} y={448} width={100} height={34} fill="#ffb627" />
      <rect x={270} y={448} width={100} height={34} fill="#3fb8af" />
      <rect x={370} y={448} width={100} height={34} fill="#f38bb0" />
      <rect x={470} y={448} width={150} height={34} fill="#5a67ff" />
      <rect x={20} y={448} width={600} height={34} fill="none" stroke={INK} strokeWidth={2.5} />

      {/* Plant */}
      <g>
        <path d="M58 380 C40 340 30 320 22 300" stroke="#2f8f6f" strokeWidth={3} fill="none" />
        <path d="M60 380 C64 330 70 310 84 290" stroke="#2f8f6f" strokeWidth={3} fill="none" />
        <ellipse cx={26} cy={312} rx={16} ry={7} fill="#3fb8af" transform="rotate(-50 26 312)" />
        <ellipse cx={44} cy={340} rx={16} ry={7} fill="#2f8f6f" transform="rotate(-30 44 340)" />
        <ellipse cx={80} cy={300} rx={16} ry={7} fill="#3fb8af" transform="rotate(40 80 300)" />
        <ellipse cx={72} cy={334} rx={15} ry={6.5} fill="#2f8f6f" transform="rotate(20 72 334)" />
        <path d="M40 380 H78 L72 432 H46 Z" fill="#ff9550" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      </g>

      <MicStand x={112} dir={1} />
      <MicStand x={528} dir={-1} />

      <Chair x={196} cushion="#ff9550" />
      <Chair x={444} cushion="#f38bb0" />

      {/* Side table with the keke and a glass */}
      <g>
        <line x1={300} y1={358} x2={308} y2={430} stroke={GOLD} strokeWidth={3} />
        <line x1={340} y1={358} x2={332} y2={430} stroke={GOLD} strokeWidth={3} />
        <line x1={304} y1={394} x2={336} y2={394} stroke={GOLD} strokeWidth={3} />
        <ellipse cx={320} cy={354} rx={34} ry={8} fill="#fff" stroke={INK} strokeWidth={2.5} />
        <g transform="translate(298 318)">
          <rect x={4} y={0} width={20} height={11} rx={3} fill={INK} />
          <rect x={0} y={9} width={28} height={19} rx={6} fill="#ffb627" stroke={INK} strokeWidth={1.8} />
          <circle cx={6} cy={30} r={4.5} fill={INK} />
          <circle cx={23} cy={30} r={4.5} fill={INK} />
        </g>
        <path d="M334 330 H346 L344 350 H336 Z" fill="#e8f4ff" stroke={INK} strokeWidth={1.8} />
      </g>

      {/* Handwritten note */}
      <text x={320} y={556} textAnchor="middle" fill={INK} style={{ font: "600 26px var(--font-caveat), cursive" }}>
        two seats, waiting for 2027’s voices
      </text>
      <path d="M470 540 C500 530 512 512 506 494" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" />
      <path d="M498 500 L506 492 L512 502" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
