export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-[0.82] ${className}`} aria-label="Design Spin-off by Sections">
      <span className="font-wide text-[1.05em] font-extrabold tracking-[-0.01em] [font-stretch:125%]">DESIGN</span>
      <span className="font-wide text-[1.05em] font-extrabold tracking-[-0.01em] [font-stretch:125%]">SPIN-OFF</span>
      <span className="mt-[0.3em] text-center font-mono text-[0.32em] tracking-[0.6em] opacity-70">BY SECTIONS</span>
    </span>
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
