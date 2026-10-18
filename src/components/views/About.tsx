import { viewPath } from "@/lib/i18n";
import { Actions, Body, Eyebrow, Page, SecondaryLink, Title, type ViewProps } from "./parts";

export function About({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.about.kicker}</Eyebrow>
      <Title>{dict.about.title}</Title>
      <div className="flex flex-col gap-4">
        {dict.about.body.map((paragraph) => (
          <Body key={paragraph}>{paragraph}</Body>
        ))}
      </div>
      <dl className="grid max-w-[62ch] grid-cols-[minmax(0,auto)_minmax(0,1fr)] items-baseline gap-x-6 gap-y-2 border-t border-rule pt-6">
        {dict.about.facts.map((fact) => (
          <div key={fact.label} className="contents">
            <dt className="eyebrow">{fact.label}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
      <Actions>
        <SecondaryLink href={viewPath(locale, "skills")}>{dict.about.skills}</SecondaryLink>
      </Actions>
    </Page>
  );
}
