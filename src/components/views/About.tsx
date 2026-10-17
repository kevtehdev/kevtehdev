import { viewPath } from "@/lib/i18n";
import { Actions, Body, Eyebrow, Page, SecondaryLink, Title, type ViewProps } from "./parts";

export function About({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>{dict.about.kicker}</Eyebrow>
      <Title>{dict.about.title}</Title>
      <Body>{dict.about.body}</Body>
      <Actions>
        <SecondaryLink href={viewPath(locale, "skills")}>{dict.about.skills}</SecondaryLink>
      </Actions>
    </Page>
  );
}
