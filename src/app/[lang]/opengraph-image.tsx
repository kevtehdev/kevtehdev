import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";

// The link preview for LinkedIn, Slack and the like: the home page in one frame.

export const alt = `${site.domain} · ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const colors = { bg: "#f5f6f8", fg: "#15181d", muted: "#5d6471", rule: "#dde0e6", pass: "#1d7a3c" };
const circumference = 2 * Math.PI * 20;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = getDictionary(hasLocale(lang) ? lang : "en");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: colors.bg,
        color: colors.fg,
      }}
    >
      <div style={{ display: "flex", fontSize: 26, letterSpacing: 3, fontWeight: 600 }}>
        {site.domain.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 3, color: colors.muted }}>
          {`${site.name} · ${dict.meta.title}`.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 68, lineHeight: 1.05, fontWeight: 700, maxWidth: 900 }}>
          {dict.home.title}
        </div>
      </div>
      <div style={{ display: "flex", gap: 48, borderTop: `2px solid ${colors.rule}`, paddingTop: 36 }}>
        {dict.case.figures.map((figure) => {
          const score = Number.parseInt(figure.value, 10);
          return (
            <div key={figure.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", position: "relative", width: 84, height: 84 }}>
                <svg width="84" height="84" viewBox="0 0 44 44" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="22" cy="22" r="20" fill="none" stroke={colors.rule} strokeWidth="3" />
                  <circle
                    cx="22"
                    cy="22"
                    r="20"
                    fill="none"
                    stroke={colors.pass}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${circumference}`}
                    strokeDashoffset={`${circumference * (1 - score / 100)}`}
                  />
                </svg>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: figure.value.length > 3 ? 20 : 28,
                    fontWeight: 700,
                    color: colors.pass,
                  }}
                >
                  {figure.value}
                </div>
              </div>
              <div style={{ display: "flex", fontSize: 18, letterSpacing: 2, color: colors.muted, maxWidth: 140 }}>
                {figure.label.toUpperCase()}
              </div>
            </div>
          );
        })}
      </div>
    </div>,
    size,
  );
}
