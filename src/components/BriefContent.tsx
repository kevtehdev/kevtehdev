import { Fragment } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import { Body, Subhead } from "./views/parts";
import { Scores } from "./Scores";

/** The Warde brief as a short article. Opened in place on Home, and the whole of /brief. */
export function BriefContent({ dict, heading = true }: { dict: Dictionary; heading?: boolean }) {
  return (
    <>
      {heading && (
        <>
          <p className="mb-1 label">{dict.brief.kicker}</p>
          <h3 className="mb-5 text-[1.3125rem] leading-[1.3] font-semibold tracking-[-0.015em]">{dict.brief.title}</h3>
        </>
      )}
      {dict.brief.sections.map((section) => (
        <Fragment key={section.heading}>
          <Subhead>{section.heading}</Subhead>
          <Body>{section.body}</Body>
        </Fragment>
      ))}
      <Subhead>{dict.brief.results}</Subhead>
      {/* Before and after, side by side, so the change reads at a glance. */}
      <table className="mb-4 w-full max-w-[34rem] text-sm">
        <thead>
          <tr className="text-left label">
            <th scope="col" className="pb-1 font-normal">
              <span className="sr-only">Lighthouse</span>
            </th>
            <th scope="col" className="pb-1 pl-4 text-right font-normal">
              {dict.brief.comparison.before}
            </th>
            <th scope="col" className="pb-1 pl-4 text-right font-normal">
              {dict.brief.comparison.after}
            </th>
          </tr>
        </thead>
        <tbody>
          {dict.brief.comparison.rows.map((row) => (
            <tr key={row.label} className="border-t border-rule">
              <th scope="row" className="py-2 text-left font-normal text-muted">
                {row.label}
              </th>
              <td className="py-2 pl-4 text-right font-mono text-[13px] whitespace-nowrap text-faint tabular-nums">
                {row.before}
              </td>
              <td className="py-2 pl-4 text-right font-mono text-[13px] whitespace-nowrap tabular-nums">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Body>{dict.brief.outcome}</Body>
      <div className="mt-4">
        <Scores dict={dict} />
      </div>
      <p className="mt-5 label">{dict.brief.tools}</p>
    </>
  );
}
