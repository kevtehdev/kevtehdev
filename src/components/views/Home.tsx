import Link from "next/link";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Scores } from "../Scores";
import { Services } from "../Services";
import {
  Actions,
  Body,
  Eyebrow,
  Lead,
  Page,
  PrimaryLink,
  Section,
  SecondaryLink,
  Title,
  type ViewProps,
} from "./parts";

/** What I offer first, then the latest launch's Lighthouse scores as proof. */
export function Home({ locale, dict }: ViewProps) {
  return (
    <Page>
      <Eyebrow>
        {site.name} · {dict.meta.title}
      </Eyebrow>
      <Title size="home">{dict.home.title}</Title>
      <Lead>{dict.home.lead}</Lead>
      <Actions>
        <PrimaryLink href={viewPath(locale, "contact")}>{dict.home.cta}</PrimaryLink>
        <SecondaryLink href={viewPath(locale, "skills")}>{dict.home.services}</SecondaryLink>
      </Actions>

      <div className="pt-10">
        <Section heading={dict.services.heading}>
          <div className="pt-3">
            <Services services={dict.services} />
          </div>
        </Section>
      </div>

      <div className="pt-10">
        <Section heading={dict.home.proofHeading}>
          <Body>{dict.home.proofBody}</Body>
          <div className="pt-2">
            <Scores dict={dict} />
          </div>
          <p>
            <Link href={viewPath(locale, "case")} prefetch className="link">
              {dict.home.caseLink}: {dict.case.title} →
            </Link>
          </p>
        </Section>
      </div>
    </Page>
  );
}
