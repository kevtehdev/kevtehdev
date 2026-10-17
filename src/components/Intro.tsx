import { site } from "@/content/site";
import { IntroScript } from "./IntroScript";

/*
 * Runs before first paint, so a returning visitor never sees the intro flash.
 * Plays once per browser session, never with reduced motion, and leaves the
 * page untouched if storage is blocked. It only ever writes to <html>, which
 * React leaves alone; the CSS for each step is in globals.css.
 */
const script = `(() => {
  const root = document.documentElement;
  try {
    if (sessionStorage.getItem("intro") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    sessionStorage.setItem("intro", "1");
  } catch {
    return;
  }
  root.dataset.intro = "play";

  function start() {
    const intro = document.getElementById("intro");
    const from = document.getElementById("intro-mark");
    const to = document.getElementById("site-mark");
    if (!intro || !from || !to) return void (root.dataset.intro = "done");
    root.dataset.intro = "loading";
    setTimeout(() => {
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      root.dataset.intro = "leaving";
      from.animate(
        [{ transform: "none" }, { transform: "translate(" + (b.left - a.left) + "px, " + (b.top - a.top) + "px)" }],
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" },
      ).onfinish = () => {
        root.dataset.intro = "done";
        // Once the score rings have filled, later pages animate on their own timing.
        setTimeout(() => delete root.dataset.intro, 1600);
      };
    }, 1550);
  }

  // Measure the wordmark in its real font, but never wait long for it.
  addEventListener("DOMContentLoaded", () => {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 600))]).then(start);
  });
})();`;

/** The domain, centred over a thin loading line, on the first page of a visit. */
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
