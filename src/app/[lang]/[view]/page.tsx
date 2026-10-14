import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { viewComponents, viewMetadata } from "@/components/views";
import { getDictionary, hasLocale, hasView, views } from "@/lib/i18n";

export function generateStaticParams() {
  return views.filter((view) => view !== "home").map((view) => ({ view }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[view]">): Promise<Metadata> {
  const { lang, view } = await params;
  if (!hasLocale(lang) || !hasView(view)) return {};
  return viewMetadata(lang, view, getDictionary(lang));
}

export default function ViewPage({ params }: PageProps<"/[lang]/[view]">) {
  return (
    <Suspense>
      <ViewContent params={params} />
    </Suspense>
  );
}

async function ViewContent({ params }: Pick<PageProps<"/[lang]/[view]">, "params">) {
  const { lang, view } = await params;
  if (!hasLocale(lang) || !hasView(view)) notFound();

  const View = viewComponents[view];
  return <View locale={lang} dict={getDictionary(lang)} />;
}
