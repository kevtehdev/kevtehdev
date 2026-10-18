import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { GiantWordmark } from "../GiantWordmark";
import { Actions, Lead, Page, PrimaryLink, SectionLabel, Title, type ViewProps } from "./parts";

/** A short statement, the domain set across the page, then what I build. */
export function Home({ locale, dict }: ViewProps) {
  return (
    <Page>
      <div className="flex max-w-xl flex-col gap-5">
        <Title size="home">{dict.home.title}</Title>
        <Lead>{dict.home.lead}</Lead>
        <Actions>
          <PrimaryLink href={viewPath(locale, "contact")}>{dict.home.cta}</PrimaryLink>
        </Actions>
      </div>

      <div className="pt-8">
        <GiantWordmark text={site.domain} />
      </div>

      <section className="flex flex-col gap-5 pt-14">
        <SectionLabel count={dict.services.items.length}>{dict.services.heading}</SectionLabel>
        <ul className="grid gap-x-14 md:grid-cols-2">
          {dict.services.items.map((item) => (
            <li key={item.title} className="flex flex-col gap-0.5 border-b border-rule py-4">
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="max-w-[52ch] text-sm text-pretty text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
