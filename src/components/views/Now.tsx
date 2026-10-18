import { site } from "@/content/site";
import { Body, Eyebrow, Page, Title, type ViewProps } from "./parts";

export function Now({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>
        <span className="text-fg">{dict.now.correction || dict.now.status}</span>
        <span
          aria-hidden
          className="ml-[0.4em] inline-block size-[0.55em] rounded-full bg-pass align-[0.05em]"
        /> · {dict.now.due} {site.nowDue[locale]}
      </Eyebrow>
      <Title>{dict.now.title}</Title>
      <Body>{dict.now.body}</Body>
    </Page>
  );
}
