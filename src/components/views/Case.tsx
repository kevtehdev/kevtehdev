import Link from "next/link";
import { site } from "@/content/site";
import { viewPath } from "@/lib/i18n";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { Figures, type ViewProps, link } from "./parts";

export function Case({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.case.kicker}</Kicker>
      <Title>{dict.case.title}</Title>
      <Body>{dict.case.body}</Body>
      <Figures dict={dict} className="mt-[var(--line)]" />
      <p className="mt-[var(--line)] flex flex-wrap gap-x-[3cqw] type-body">
        <a href={site.latestCase.url} className={link} rel="noopener">
          {dict.case.link} ↗
        </a>
        <Link href={viewPath(locale, "brief")} prefetch className={link}>
          {dict.case.brief} →
        </Link>
      </p>
    </Label>
  );
}
