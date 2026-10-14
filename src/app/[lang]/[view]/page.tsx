import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { viewComponents, viewMetadata } from "@/components/views";
import { NOT_FOUND_VIEW, getDictionary, hasLocale, hasView, views } from "@/lib/i18n";

/**
 * Every view, plus NOT_FOUND_VIEW: an unknown view rendered at build time, so
 * its 404 is stored with the page. The proxy rewrites every unknown view to it,
 * which is how even the first visit to a bad URL gets a real 404 status.
 */
export function generateStaticParams() {
  return [...views.filter((view) => view !== "home"), NOT_FOUND_VIEW].map((view) => ({ view }));
}

// The view is checked before anything streams, so the 404 is decided up front.
// Every valid view is prerendered above, so letting navigations wait costs nothing.
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/[view]">): Promise<Metadata> {
  const { lang, view } = await params;
  if (!hasLocale(lang) || !hasView(view)) return {};
  return viewMetadata(lang, view, getDictionary(lang));
}

export default async function ViewPage({ params }: PageProps<"/[lang]/[view]">) {
  const { lang, view } = await params;
  if (!hasLocale(lang) || !hasView(view)) notFound();

  const View = viewComponents[view];
  return <View locale={lang} dict={getDictionary(lang)} />;
}
