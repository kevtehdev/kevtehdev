import localFont from "next/font/local";

// Self-hosted (SIL OFL), so no request ever leaves for a font CDN.

export const serif = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const sans = localFont({
  src: [
    { path: "../fonts/ibm-plex-sans-latin-300-normal.woff2", weight: "300", style: "normal" },
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

// Wordmark on the CD-ROM edition only, so it isn't preloaded on every page.
export const wordmark = localFont({
  src: [{ path: "../fonts/michroma-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-michroma",
  display: "swap",
  preload: false,
  fallback: ["ui-sans-serif", "sans-serif"],
});

// The A:\> prompt on the label. Only needed once it opens, so it isn't preloaded.
export const terminal = localFont({
  src: [{ path: "../fonts/vt323-latin-400-normal.woff2", weight: "400", style: "normal" }],
  variable: "--font-vt323",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "monospace"],
});
