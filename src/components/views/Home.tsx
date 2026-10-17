import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Scores } from "../Scores";
import { Actions, Eyebrow, Lead, Page, PrimaryLink, SecondaryLink, Title, type ViewProps } from "./parts";

/** The proof first: what I build, then the latest case's Lighthouse scores. */
export function Home({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>
        {site.name} · {dict.meta.title}
      </Eyebrow>
      <Title size="home">{dict.home.title}</Title>
      <Lead>{dict.home.lead}</Lead>
      <div className="pt-4">
        <Scores dict={dict} />
      </div>
      <Actions>
        <PrimaryLink href={viewPath(locale, "contact")}>{dict.home.cta}</PrimaryLink>
        <SecondaryLink href={viewPath(locale, "brief")}>{dict.home.brief}</SecondaryLink>
      </Actions>
    </Page>
  );
}
