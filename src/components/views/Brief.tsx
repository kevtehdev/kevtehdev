import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Scores } from "../Scores";
import { Actions, Body, Eyebrow, Page, SecondaryLink, Section, Title, type ViewProps } from "./parts";

/** The full story behind the latest case, opened from the Case view. */
export function Brief({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.brief.kicker}</Eyebrow>
      <Title>{dict.brief.title}</Title>
      {dict.brief.sections.map((section) => (
        <Section key={section.heading} heading={section.heading}>
          <Body>{section.body}</Body>
        </Section>
      ))}
      <Section heading={dict.brief.results}>
        <Scores dict={dict} />
        <Body>{dict.brief.rankings}</Body>
      </Section>
      <Section heading={dict.brief.stack}>
        <p className="font-mono text-sm leading-relaxed text-muted">{dict.brief.tools}</p>
      </Section>
      <Actions>
        <SecondaryLink href={viewPath(locale, "case")}>{dict.brief.back}</SecondaryLink>
        <SecondaryLink href={site.latestCase.url}>{dict.case.link} ↗</SecondaryLink>
      </Actions>
    </Page>
  );
}
