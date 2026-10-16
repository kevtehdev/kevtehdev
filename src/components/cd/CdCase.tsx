import type { ReactNode } from "react";
import { LanguageSwitch } from "@/components/disk/LanguageSwitch";
import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import type { Locale } from "@/lib/i18n";
import { formatCapacity, media } from "@/lib/progress";
import { Disc } from "./Disc";
import { TrackList } from "./TrackList";

type CdCaseProps = {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
};

/**
 * The CD-ROM edition, unlocked at 5 shipped projects. An open jewel case: the
 * booklet on the left shows the current view, the disc sits in the tray on
 * the right, and the track list underneath switches views. On phones the
 * booklet stacks above the tray.
 */
export function CdCase({ locale, dict, children }: CdCaseProps) {
  const cdrom = media[1];

  return (
    <div className="w-full max-w-[920px]">
      <div className="grid rounded-md bg-case p-[6px] shadow-[inset_0_0_0_1px_var(--color-case-edge),0_18px_30px_-18px_rgba(0,0,0,0.35)] sm:grid-cols-2">
        {/* Booklet: each page renders its view in here. */}
        <div className="@container relative aspect-square">
          <main className="absolute inset-0 overflow-hidden bg-label">{children}</main>
        </div>

        {/* Tray, with the hinge along its left edge */}
        <div className="@container relative aspect-square bg-[repeating-linear-gradient(to_right,var(--color-case-edge)_0_1px,transparent_1px_3px)] bg-[length:12px_100%] bg-no-repeat">
          <div className="absolute top-[3cqw] right-[3cqw] z-10">
            <LanguageSwitch locale={locale} labels={dict.language} />
          </div>
          <Disc
            name={site.wordmark}
            line={dict.upgrade.discLine}
            caption={`CD-ROM · ${formatCapacity(locale, cdrom)} · ${site.location}`}
          />
        </div>
      </div>

      <TrackList locale={locale} label={dict.upgrade.tracks} titles={dict.nav} />
    </div>
  );
}
