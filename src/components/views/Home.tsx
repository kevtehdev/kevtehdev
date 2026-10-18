import Link from "next/link";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { EmailButton } from "../EmailButton";
import { LocalTime } from "../LocalTime";
import { Scores } from "../Scores";
import { Services } from "../Services";
import { Actions, Body, Eyebrow, Lead, Page, PrimaryLink, SectionLabel, Title, type ViewProps } from "./parts";

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
        <EmailButton email={site.email} copyLabel={dict.contact.copy} done={dict.contact.copied} />
      </Actions>
      <p className="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted">
        <span aria-hidden className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-pass opacity-60" />
          <span className="relative size-2 rounded-full bg-pass" />
        </span>
        {site.availableFrom ? `${dict.home.available} ${site.availableFrom[locale]}` : dict.home.availableNow}
        <span aria-hidden>·</span>
        {site.location} <LocalTime locale={locale} label={dict.home.localTime} />
      </p>

      <section className="flex flex-col gap-6 pt-16">
        <SectionLabel count={dict.services.items.length}>{dict.services.label}</SectionLabel>
        <Services services={dict.services} />
      </section>

      <section className="flex flex-col gap-6 pt-16">
        <SectionLabel>{dict.home.proofHeading}</SectionLabel>
        <Body>{dict.home.proofBody}</Body>
        <Scores dict={dict} />
        <p>
          <Link href={viewPath(locale, "case")} prefetch className="link">
            {dict.home.caseLink}: {dict.case.title} →
          </Link>
        </p>
      </section>
    </Page>
  );
}
