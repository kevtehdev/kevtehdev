import type { ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries/en";
import type { Locale } from "@/lib/i18n";
import { DiskNav } from "./DiskNav";
import { LanguageSwitch } from "./LanguageSwitch";
import { Prompt } from "./Prompt";
import { promptProps } from "./promptProps";

type DiskProps = {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
};

/**
 * The diskette. The shutter carries the language switch, the paper label
 * shows the current view, and the strip along the bottom edge switches views.
 * Proportions follow a real 3.5" disk (90 × 94 mm).
 */
export function Disk({ locale, dict, children }: DiskProps) {
  return (
    <div className="@container relative w-full max-w-[600px]">
      {/* Taller on phones, where the nav sits below the disk, so the label gets more room. */}
      <div className="relative aspect-[90/112] [filter:drop-shadow(0_0_1px_rgb(255_255_255/0.28))_drop-shadow(6px_6px_0_rgb(0_0_0/0.45))] sm:aspect-[90/94]">
        {/*
          Body. The top edge is traced from a real 3.5" disk (x as % of width,
          y as % of height): the raised left part with a rounded corner, the
          recess a hair lower in two steps, the shutter flush with the top,
          the dip of the shutter channel on its right, then the right part
          with its small step and the cut corner. Phones scale y to the taller box.
        */}
        <div
          aria-hidden
          className="absolute inset-0 bg-disk [clip-path:polygon(0_0.8%,0.29%_0.23%,1%_0,9.9%_0,9.9%_0.69%,14.7%_0.69%,14.7%_0.37%,77.6%_0.37%,77.6%_2.09%,80.1%_2.09%,81.2%_0.69%,90.3%_0.69%,90.6%_0.46%,94.6%_0.46%,100%_5.04%,100%_100%,0_100%)] sm:[clip-path:polygon(0_0.96%,0.29%_0.28%,1%_0,9.9%_0,9.9%_0.82%,14.7%_0.82%,14.7%_0.44%,77.6%_0.44%,77.6%_2.49%,80.1%_2.49%,81.2%_0.82%,90.3%_0.82%,90.6%_0.55%,94.6%_0.55%,100%_6.01%,100%_100%,0_100%)]"
        />

        {/* Edge of the raised left part, where the recess begins */}
        <div
          aria-hidden
          className="absolute top-[0.69%] left-[9.9%] h-[26.3%] w-px bg-black/60 shadow-[1px_0_0_rgb(255_255_255/0.05)] sm:top-[0.82%] sm:h-[31.2%]"
        />

        {/* Small slot moulded into the recess */}
        <div
          aria-hidden
          className="absolute top-[1.24%] left-[11%] h-[0.24%] w-[2.3%] bg-metal-edge/70 sm:top-[1.47%] sm:h-[0.28%]"
        />

        {/* Insert arrow, moulded into the raised left part */}
        <svg
          aria-hidden
          viewBox="0 0 10 20"
          className="absolute top-[5.7%] left-[3.3%] w-[2.4cqw] text-emboss [filter:drop-shadow(0_1px_0_rgb(255_255_255/0.07))_drop-shadow(0_-1px_0_rgb(0_0_0/0.5))] sm:top-[6.8%]"
        >
          <path d="M5 0 10 8H6.6V20H3.4V8H0Z" fill="currentColor" />
        </svg>

        {/* Metal shutter, flush with the top edge; the window sits right of centre */}
        <div className="absolute top-0 left-[24.4%] h-[27%] w-[53.2%] border-x border-metal-edge brushed-metal p-[2cqw] shadow-[0_1px_0_rgb(0_0_0/0.5)] sm:h-[32%] sm:p-[3.4cqw]">
          <LanguageSwitch locale={locale} labels={dict.language} />
          <div
            aria-hidden
            className="absolute top-[15%] right-[15.8%] h-[68%] w-[25%] rounded-[2px] bg-media shadow-[inset_0_1px_3px_rgb(0_0_0/0.8)]"
          />
        </div>

        {/* High-density mark, moulded under the cut corner */}
        <p
          aria-hidden
          className="absolute top-[9.2%] right-[6.5%] font-sans text-[6.2cqw] leading-none font-medium tracking-[-0.06em] emboss select-none sm:top-[11%]"
        >
          HD
        </p>

        {/*
          Groove moulded around the label recess: down both sides, well clear
          of the label, round a soft corner and along just under its bottom edge.
        */}
        <div
          aria-hidden
          className="absolute inset-x-[3.6%] top-[29%] bottom-[10.4%] rounded-b-[2.6cqw] border-[1.5px] border-t-0 border-black/70 shadow-[0_1px_0_rgb(255_255_255/0.05)] sm:top-[34.5%] sm:bottom-[14.2%]"
        />

        {/* Paper label: each page renders its view in here. */}
        <main className="absolute inset-x-[7%] top-[31%] bottom-[11%] overflow-hidden rounded-[1.2cqw] bg-label sm:top-[37%] sm:bottom-[15%]">
          {children}
          <Prompt {...promptProps(locale, dict)} />
        </main>

        {/* Write-protect and density holes */}
        <div
          aria-hidden
          className="absolute bottom-[3%] left-[2.2%] h-[5%] w-[3.2%] bg-[#0c0c0d] sm:bottom-[3.6%] sm:h-[6%]"
        />
        <div
          aria-hidden
          className="absolute right-[2.2%] bottom-[3%] h-[2.7%] w-[3.2%] bg-[#0c0c0d] sm:bottom-[3.6%] sm:h-[3.2%]"
        />
      </div>

      <DiskNav locale={locale} labels={dict.nav} />
    </div>
  );
}
