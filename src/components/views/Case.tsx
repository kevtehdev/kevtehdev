import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Scores } from "../Scores";
import { Actions, Body, Page, Row, TextLink, Title, type ViewProps } from "./parts";

export function Case({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Row n={1} heading={false} label={dict.case.kicker}>
        <Title>{dict.case.title}</Title>
        <Body>{dict.case.body}</Body>
        <Actions>
          <TextLink href={viewPath(locale, "brief")}>{dict.case.brief} →</TextLink>
          <TextLink href={site.latestCase.url}>{dict.case.link} ↗</TextLink>
        </Actions>
      </Row>
      <Row n={2} label="Lighthouse">
        <Scores dict={dict} />
      </Row>
    </Page>
  );
}
