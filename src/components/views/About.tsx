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
      <dl className="grid max-w-[62ch] grid-cols-1 gap-y-0.5 border-t border-rule pt-6 sm:grid-cols-[minmax(0,auto)_minmax(0,1fr)] sm:items-baseline sm:gap-x-6 sm:gap-y-2 [&>div:not(:first-child)>dt]:pt-3 sm:[&>div>dt]:pt-0">
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
