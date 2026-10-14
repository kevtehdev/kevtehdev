import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { locales, viewPath, views } from "@/lib/i18n";

/** Every view in both languages, each listing its other-language twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  return views.flatMap((view) =>
    locales.map((locale) => ({
      url: `${site.url}${viewPath(locale, view)}`,
      changeFrequency: "monthly" as const,
      priority: view === "home" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}${viewPath(l, view)}`])),
      },
    })),
  );
}
