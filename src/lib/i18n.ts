import { en } from "@/content/dictionaries/en";
import { sv } from "@/content/dictionaries/sv";

export const locales = ["en", "sv"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

const dictionaries = { en, sv } as const;

export const getDictionary = (locale: Locale) => dictionaries[locale];

/** Views in the header menu, in order. "home" is the locale root, reached from the wordmark. */
export const navViews = ["case", "now", "about", "contact"] as const;

/** Every view: home, the menu views, and pages opened from inside them. */
export const views = ["home", ...navViews, "brief", "skills"] as const;

export type View = (typeof views)[number];

/** Pages opened from inside another view, mapped to that view. The menu marks the parent as current. */
export const parentView: Partial<Record<View, View>> = { brief: "case", skills: "about" };

/** Prerendered as a 404; the proxy rewrites unknown views here (see [view]/page.tsx). */
export const NOT_FOUND_VIEW = "404";

export const hasView = (value: string): value is Exclude<View, "home"> =>
  value !== "home" && (views as readonly string[]).includes(value);

export const viewPath = (locale: Locale, view: View) => (view === "home" ? `/${locale}` : `/${locale}/${view}`);
