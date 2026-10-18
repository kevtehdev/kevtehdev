import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";

/** "100 desktop · 97–99 mobile": the latest case's performance scores, short enough for one line. */
export function performanceLine(dict: Dictionary) {
  return dict.case.figures
    .flatMap((figure) => ("device" in figure && figure.device ? [`${figure.value} ${figure.device}`] : []))
    .join(" · ");
}

// Lighthouse's gauge: a circle of radius 56 in a 120 box, its arc drawn to the score.
const circumference = 2 * Math.PI * 56;

/**
 * One score drawn the way Lighthouse draws it: a green arc around a tinted
 * disc, the score in the middle, the category underneath. A range like
 * "97–99" fills to its lower end.
 */
function Gauge({ value, label }: { value: string; label: string }) {
  const score = Number.parseInt(value, 10);
  return (
    <li className="flex w-[5.75rem] flex-col items-center gap-2 text-center">
      <span className="relative size-[4.5rem]">
        <svg viewBox="0 0 120 120" aria-hidden className="size-full -rotate-90">
          <circle cx="60" cy="60" r="56" strokeWidth="8" className="fill-pass-fill stroke-pass-fill" />
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
            className="stroke-pass-arc"
          />
        </svg>
        <span
          className={[
            "absolute inset-0 grid place-items-center font-mono font-semibold text-pass-text tabular-nums",
            value.length > 3 ? "text-[1.0625rem]" : "text-[1.375rem]",
          ].join(" ")}
        >
          {value}
        </span>
      </span>
      <span className="text-xs leading-snug">{label}</span>
    </li>
  );
}

/** The latest case's Lighthouse scores as Lighthouse shows them, with where they come from and how to check them. */
export function Scores({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <ul className="flex flex-wrap gap-x-3 gap-y-5">
        {dict.case.figures.map((figure) => (
          <Gauge key={figure.label} value={figure.value} label={figure.label} />
        ))}
      </ul>
      <p className="mt-4 label">
        {dict.case.figuresSource} ·{" "}
        <a href={site.latestCase.pagespeed} className="link text-muted" rel="noopener">
          {dict.case.test} ↗
        </a>
      </p>
    </div>
  );
}
