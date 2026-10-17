import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Scores } from "../Scores";
import { Actions, Body, Eyebrow, Page, SecondaryLink, Title, type ViewProps } from "./parts";

export function Case({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.case.kicker}</Eyebrow>
      <Title>{dict.case.title}</Title>
      <Body>{dict.case.body}</Body>
      <Scores dict={dict} />
      <Actions>
        <SecondaryLink href={viewPath(locale, "brief")}>{dict.case.brief} →</SecondaryLink>
        <SecondaryLink href={site.latestCase.url}>{dict.case.link} ↗</SecondaryLink>
      </Actions>
    </Page>
  );
}
