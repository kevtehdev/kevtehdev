import localFont from "next/font/local";

// Self-hosted (SIL OFL), so no request ever leaves for a font CDN.

export const display = localFont({
  src: [
    { path: "../fonts/familjen-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/familjen-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-familjen",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const sans = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

export const mono = localFont({
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});
