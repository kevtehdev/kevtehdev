import { site } from "@/content/site";
import { IntroScript } from "./IntroScript";

/*
 * Runs before first paint, so the page never shows before the intro covers it.
 * Plays on every full page load. With reduced motion the loader still shows,
 * but nothing moves. It only ever writes to <html>, which React leaves alone;
 * the CSS for each step is in globals.css. The end-to-end tests set
 * window.__skipIntro so they can check pages without waiting.
 */
const script = `(() => {
  if (window.__skipIntro) return;
  const root = document.documentElement;
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.dataset.intro = "play";

  function start() {
    const intro = document.getElementById("intro");
    const from = document.getElementById("intro-mark");
    const to = document.getElementById("site-mark");
    if (!intro || !from) return void (root.dataset.intro = "done");
    root.dataset.intro = "loading";
    setTimeout(() => {
      // No header wordmark to land on: the loading text simply fades out.
      if (!to) {
        root.dataset.intro = "leaving";
        from.animate([{ opacity: 1 }, { opacity: 0 }], { duration: still ? 0 : 450, easing: "ease-out", fill: "forwards" })
          .onfinish = () => {
          root.dataset.intro = "done";
          setTimeout(() => delete root.dataset.intro, 1800);
        };
        return;
      }
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      root.dataset.intro = "leaving";
      from.animate(
        [{ transform: "none" }, { transform: "translate(" + (b.left - a.left) + "px, " + (b.top - a.top) + "px)" }],
        // A calm start and a long, soft landing, beginning as the line fades out.
        { duration: still ? 0 : 900, delay: still ? 0 : 120, easing: "cubic-bezier(0.45, 0, 0.15, 1)", fill: "forwards" },
      ).onfinish = () => {
        root.dataset.intro = "done";
        // Once the page has settled, later pages animate on their own timing.
        setTimeout(() => delete root.dataset.intro, 1800);
      };
    }, 1550);
  }

  // Measure the wordmark in its real font, but never wait long for it.
  addEventListener("DOMContentLoaded", () => {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(start);
  });
})();`;

/** The domain, centred over a thin loading line, on every page load. */
export function Intro() {
  return (
    <>
      <IntroScript code={script} />
      <div id="intro" className="intro" aria-hidden>
        <div>
          <span id="intro-mark" className="inline-block wordmark">
            {site.domain}
          </span>
          <div className="intro-bar">
            <span />
          </div>
        </div>
      </div>
    </>
  );
}
