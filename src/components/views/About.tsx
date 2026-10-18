import { viewPath } from "@/lib/i18n";
import { Actions, Body, Facts, Page, Row, TextLink, Title, type ViewProps } from "./parts";

export function About({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Row n={1} heading={false} label={dict.about.kicker}>
        <Title>{dict.about.title}</Title>
        {dict.about.body.map((paragraph) => (
          <Body key={paragraph}>{paragraph}</Body>
        ))}
        <Facts items={dict.about.facts} />
        <Actions>
          <TextLink href={viewPath(locale, "skills")}>{dict.about.skills}</TextLink>
        </Actions>
      </Row>
    </Page>
  );
}
