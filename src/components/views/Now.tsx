import { site } from "@/content/site";
import { Body, Kicker, Label, Title } from "../disk/Label";
import type { ViewProps } from "./parts";

export function Now({ locale, dict }: ViewProps) {
  return (
    <Label>
      <Kicker>
        <span className="text-ink">{dict.now.correction || dict.now.status}</span>
        <span
          aria-hidden
          className="ml-[0.3em] inline-block h-[0.9em] w-[0.5em] translate-y-[0.12em] animate-pulse bg-ink"
        />{" "}
        · {dict.now.due} {site.nowDue[locale]}
      </Kicker>
      <Title>{dict.now.title}</Title>
      <Body>{dict.now.body}</Body>
    </Label>
  );
}
