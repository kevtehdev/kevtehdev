import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

// The link preview for LinkedIn, Slack and the like: the disk on the platinum desktop.

export const alt = `${site.domain} · ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 72,
        padding: "0 96px",
        background: "#dcdcdc",
        color: "#1d1e20",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          width: 380,
          height: 397,
          background: "#1d1e20",
          boxShadow: "10px 10px 0 rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 93,
            top: 0,
            width: 202,
            height: 127,
            background: "#ccd0d3",
            display: "flex",
            justifyContent: "flex-end",
            padding: "19px 32px",
          }}
        >
          <div style={{ width: 50, height: 86, background: "#141517", borderRadius: 2 }} />
        </div>
        <div
          style={{
            position: "absolute",
            left: 27,
            right: 27,
            top: 147,
            bottom: 60,
            background: "#f3f0e7",
            borderRadius: 7,
            display: "flex",
            flexDirection: "column",
            padding: "18px 22px",
            gap: 8,
          }}
        >
          <div
            style={{ fontSize: 13, letterSpacing: 2, color: "#5a564d" }}
          >{`VOL. 1 · ${site.name.toUpperCase()}`}</div>
          <div style={{ fontSize: 26 }}>{dict.home.greeting}</div>
          <div style={{ fontSize: 15, color: "#5a564d" }}>CASE.TXT · NOW.TXT · README.TXT</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#5a564d" }}>{site.domain.toUpperCase()}</div>
        <div style={{ fontSize: 72, lineHeight: 1.05 }}>{dict.meta.title}</div>
        <div style={{ fontSize: 30, lineHeight: 1.35, color: "#45474b" }}>{dict.home.line}</div>
        <div style={{ fontSize: 24, color: "#5a564d" }}>{`${site.name} · ${site.location}`}</div>
      </div>
    </div>,
    size,
  );
}
