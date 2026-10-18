import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { Facts } from "./views/parts";

/** "97–99 · 100 · 100 · 100": the latest case's Lighthouse scores on one line. */
export function scoreLine(dict: Dictionary) {
  return dict.case.figures.map((figure) => figure.value).join(" · ");
}

/** The latest case's Lighthouse scores, one per line, with where they come from and how to check them. */
export function Scores({ dict }: { dict: Dictionary }) {
  return (
    <div>
      <Facts
        items={dict.case.figures.map((figure) => ({
          label: figure.label,
          value: <span className="font-mono text-[13px] tabular-nums">{figure.value}</span>,
        }))}
      />
      <p className="mt-3 label">
        {dict.case.figuresSource} ·{" "}
        <a href={site.latestCase.pagespeed} className="link text-muted" rel="noopener">
          {dict.case.test} ↗
        </a>
      </p>
    </div>
  );
}
