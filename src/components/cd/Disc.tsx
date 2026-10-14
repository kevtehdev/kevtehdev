"use client";

import { usePathname } from "next/navigation";

type DiscProps = {
  name: string;
  line: string;
  caption: string;
};

/**
 * The CD in its tray, written on with a marker. It spins one turn whenever
 * the visitor changes track, the way a drive spins up to read.
 */
export function Disc({ name, line, caption }: DiscProps) {
  const pathname = usePathname();

  return (
    <div aria-hidden className="absolute inset-[7%] rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.15)]">
      <div
        key={pathname}
        className="absolute inset-0 rounded-full border border-metal-edge disc-sheen motion-safe:animate-spin-once"
      >
        <p className="absolute inset-x-0 top-[14%] text-center font-wordmark text-[7cqw] leading-none tracking-[0.14em]">
          {name}
        </p>
        <p className="absolute inset-x-0 top-[27%] text-center font-serif text-[4.6cqw] italic">{line}</p>
        <div className="absolute inset-[36%] rounded-full border border-metal-edge bg-metal/85" />
        <div className="absolute inset-[45.5%] rounded-full border border-metal-edge bg-case" />
        <p className="absolute inset-x-0 bottom-[15%] text-center font-mono text-[2.2cqw] tracking-[0.14em] text-ink-soft uppercase">
          {caption}
        </p>
      </div>
    </div>
  );
}
