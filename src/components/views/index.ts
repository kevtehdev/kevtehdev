import type { Metadata } from "next";
import type { Dictionary } from "@/content/dictionaries/en";
import { type Locale, type View, locales, viewPath } from "@/lib/i18n";
import { About } from "./About";
import { Brief } from "./Brief";
import { Case } from "./Case";
import { Contact } from "./Contact";
import { Home } from "./Home";
import { Now } from "./Now";
import type { ViewProps } from "./parts";
import { Roadmap } from "./Roadmap";
import { Skills } from "./Skills";
import { Upgrade } from "./Upgrade";

export const viewComponents: Record<View, (props: ViewProps) => React.JSX.Element> = {
  home: Home,
  case: Case,
  now: Now,
  about: About,
  contact: Contact,
  upgrade: Upgrade,
  roadmap: Roadmap,
  brief: Brief,
  skills: Skills,
};

/** Title, description and hreflang alternates for one view in one locale. */
export function viewMetadata(locale: Locale, view: View, dict: Dictionary): Metadata {
  const languages = Object.fromEntries(locales.map((l) => [l, viewPath(l, view)]));

  return {
    ...(view === "home" ? {} : { title: dict.nav[view] }),
    alternates: {
      canonical: viewPath(locale, view),
      languages: { ...languages, "x-default": viewPath("en", view) },
    },
  };
}
