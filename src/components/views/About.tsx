import Link from "next/link";
import { viewPath } from "@/lib/i18n";
import { Body, Kicker, Label, Title } from "../disk/Label";
import { type ViewProps, link } from "./parts";

export function About({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>{dict.about.kicker}</Kicker>
      <Title>{dict.about.title}</Title>
      <Body>{dict.about.body}</Body>
      <p className="mt-[var(--line)] type-body">
        <Link href={viewPath(locale, "skills")} prefetch className={link}>
          {dict.about.skills}
        </Link>
      </p>
    </Label>
  );
}
