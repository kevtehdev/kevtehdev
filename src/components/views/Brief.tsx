import Link from "next/link";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { Figures, type ViewProps, link } from "./parts";

/** The full story behind the latest case, opened from the Case view. */
export function Brief({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.brief.kicker}</Kicker>
      <Title>{dict.brief.title}</Title>
      {dict.brief.sections.map((section) => (
        <section key={section.heading} className="mt-[var(--line)]">
          <Kicker>{section.heading}</Kicker>
          <Body>{section.body}</Body>
        </section>
      ))}
      <section className="mt-[var(--line)]">
        <Kicker>{dict.brief.results}</Kicker>
        <Figures dict={dict} />
        <Body>{dict.brief.rankings}</Body>
      </section>
      <section className="mt-[var(--line)]">
        <Kicker>{dict.brief.stack}</Kicker>
        <p className="type-body">{dict.brief.tools}</p>
      </section>
      <p className="mt-[var(--line)] flex flex-wrap gap-x-[3cqw] type-body">
        <Link href={viewPath(locale, "case")} prefetch className={link}>
          {dict.brief.back}
        </Link>
        <a href={site.latestCase.url} className={link} rel="noopener">
          {dict.case.link} ↗
        </a>
      </p>
    </Label>
  );
}
