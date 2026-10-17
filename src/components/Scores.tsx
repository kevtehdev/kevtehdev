import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";

// Circumference of the ring's circle (r = 20), so a score maps straight onto the arc.
const circumference = 2 * Math.PI * 20;

/**
 * The latest case's Lighthouse scores, drawn like Lighthouse draws them: a
 * green ring per category that fills to the score. A range like "97–99" fills
 * to its lower end.
 */
export function Scores({ dict }: { dict: Dictionary }) {
  return (
    <figure className="flex flex-col gap-4">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-7 border-y border-rule py-8 sm:grid-cols-4">
        {dict.case.figures.map((figure) => {
          const score = Number.parseInt(figure.value, 10);
          return (
            <li key={figure.label} className="flex flex-col items-center gap-2.5 text-center">
              <span className="relative size-22">
                <svg viewBox="0 0 44 44" aria-hidden className="size-full -rotate-90">
                  <circle cx="22" cy="22" r="20" fill="none" strokeWidth="3" className="stroke-rule" />
                  <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="ring-arc stroke-pass"
                    style={{ strokeDashoffset: circumference * (1 - score / 100) }}
                  />
                </svg>
                <span
                  className={[
                    "absolute inset-0 grid place-items-center font-display font-semibold text-pass tabular-nums",
                    figure.value.length > 3 ? "text-lg" : "text-2xl",
                  ].join(" ")}
                >
                  {figure.value}
                </span>
              </span>
              <span className="eyebrow text-[0.6875rem]">{figure.label}</span>
            </li>
          );
        })}
      </ul>
      <figcaption className="flex flex-wrap justify-between gap-x-6 gap-y-2 font-mono text-xs text-muted">
        <span>
          {dict.case.title} · {dict.case.figuresSource}
        </span>
        <a href={site.latestCase.pagespeed} className="text-pass link" rel="noopener">
          {dict.case.test} ↗
        </a>
      </figcaption>
    </figure>
  );
}
