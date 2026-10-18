import { Fragment } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import { Body, Subhead } from "./views/parts";
import { scoreLine } from "./Scores";

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
      <Body>{dict.brief.rankings}</Body>
      <p className="mt-2 label">
        {dict.case.figuresSource} · {scoreLine(dict)}
      </p>
      <p className="mt-5 label">{dict.brief.tools}</p>
    </>
  );
}
