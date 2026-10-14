import type { ReactNode } from "react";

/*
 * Handwriting on the label: notes in felt-tip, plus the circles, strikes,
 * ticks and arrows that go with them. All drawn as inline SVG strokes in the
 * current text colour, and hidden from assistive tech unless they carry text.
 */

type Ink = "ink" | "red";

const inkClass: Record<Ink, string> = { ink: "text-ink", red: "text-red-pen" };

/** A note in felt-tip, tilted the way a hand writes. Position it with `className`. */
export function Note({
  children,
  ink = "ink",
  className = "",
}: {
  children: ReactNode;
  ink?: Ink;
  className?: string;
}) {
  return (
    <span
      className={`font-marker text-[max(0.9375rem,3cqw)] leading-none whitespace-nowrap ${inkClass[ink]} ${className}`}
    >
      {children}
    </span>
  );
}

/** Circles its children in red pen. */
export function Ring({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 120 40"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[1.6cqw] -top-[0.3cqw] -bottom-[0.5cqw] h-[calc(100%+0.8cqw)] w-[calc(100%+3.2cqw)] overflow-visible text-red-pen"
      >
        <path
          d="M10 24C6 9 50 3 92 6c26 3 29 24 3 29-27 5-75 3-86-7-5-6 5-14 17-17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A hasty line through its children, as when a note is corrected. */
export function Strike({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[0.5cqw] top-1/2 h-[0.8cqw] w-[calc(100%+1cqw)] -translate-y-1/2 overflow-visible text-ink"
      >
        <path
          d="M2 6C30 3 60 7 98 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  );
}

/** A red tick, for things that are done. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 30 24" className={`h-[2.4cqw] w-[3cqw] text-red-pen ${className}`}>
      <path
        d="M3 12l8 8L28 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** A quick hand-drawn arrow pointing up or left. */
export function Arrow({ direction, className = "" }: { direction: "up" | "left"; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`inline-block h-[2.2cqw] w-[2.2cqw] ${direction === "left" ? "-rotate-90" : ""} ${className}`}
    >
      <path
        d="M12 21C11 15 12 9 12 3M5 9l7-6 7 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Tally marks in groups of five: four strokes and a fifth across them.
 * Strokes not yet earned are drawn faint and dotted, like a pencil guide.
 */
export function Tally({ done, total, label }: { done: number; total: number; label: string }) {
  const groups = Math.ceil(total / 5);

  return (
    <span role="img" aria-label={label} className="inline-flex gap-[1.2cqw] align-middle">
      {Array.from({ length: groups }, (_, group) => (
        <svg key={group} aria-hidden viewBox="0 0 44 26" className="h-[3.6cqw] w-[6cqw] overflow-visible">
          {Array.from({ length: Math.min(5, total - group * 5) }, (_, i) => {
            const index = group * 5 + i;
            const earned = index < done;
            const d = i < 4 ? `M${5 + i * 8} 3 ${4 + i * 8} 23` : "M1 19 33 6";
            return (
              <path
                key={i}
                d={d}
                fill="none"
                stroke={earned ? "var(--color-ink)" : "var(--color-pencil)"}
                strokeOpacity={earned ? 1 : 0.55}
                strokeWidth={earned ? 2.6 : 1.6}
                strokeDasharray={earned ? undefined : "2 3"}
                strokeLinecap="round"
              />
            );
          })}
        </svg>
      ))}
    </span>
  );
}
