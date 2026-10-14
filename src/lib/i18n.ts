import { en } from "@/content/dictionaries/en";
import { sv } from "@/content/dictionaries/sv";

export const locales = ["en", "sv"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

const dictionaries = { en, sv } as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Views in the nav strip, in tab order. "home" is the locale root. */
export const navViews = ["home", "case", "now", "about", "contact"] as const;

/** Every view on the disk: the nav views plus files opened from Home. */
export const views = [...navViews, "upgrade", "roadmap", "brief", "skills"] as const;

export type View = (typeof views)[number];

/** Prerendered as a 404; the proxy rewrites unknown views here (see [view]/page.tsx). */
export const NOT_FOUND_VIEW = "404";

export const hasView = (value: string): value is Exclude<View, "home"> =>
  value !== "home" && (views as readonly string[]).includes(value);

export const viewPath = (locale: Locale, view: View) => (view === "home" ? `/${locale}` : `/${locale}/${view}`);
