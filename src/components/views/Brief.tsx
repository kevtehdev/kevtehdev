import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { BriefContent } from "../BriefContent";
import { Actions, Page, Row, TextLink, Title, type ViewProps } from "./parts";

/** The full story behind the latest case: the same brief that opens on Home, as its own page. */
export function Brief({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Row n={1} heading={false} label={dict.brief.kicker}>
        <Title>{dict.brief.title}</Title>
        <div className="max-w-[56ch]">
          <BriefContent dict={dict} heading={false} />
        </div>
        <Actions>
          <TextLink href={viewPath(locale, "case")}>{dict.brief.back}</TextLink>
          <TextLink href={site.latestCase.url}>{dict.case.link} ↗</TextLink>
        </Actions>
      </Row>
    </Page>
  );
}
