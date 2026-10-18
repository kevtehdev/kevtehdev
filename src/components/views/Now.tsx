import { site } from "@/content/site";
import { Body, Page, Row, Title, type ViewProps } from "./parts";

export function Now({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Row
        n={1}
        heading={false}
        label={
          <span className="inline-flex items-center gap-[7px] text-fg before:size-[5px] before:rounded-full before:bg-fg">
            {dict.now.correction || dict.now.status}
          </span>
        }
      >
        <Title>{dict.now.title}</Title>
        <Body>{dict.now.body}</Body>
        <p className="mt-3 label">
          {dict.now.due} {site.nowDue[locale]}
        </p>
      </Row>
    </Page>
  );
}
