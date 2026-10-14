import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { viewComponents, viewMetadata } from "@/components/views";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return viewMetadata(lang, "home", getDictionary(lang));
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const Home = viewComponents.home;
  return <Home locale={lang} dict={getDictionary(lang)} />;
}
