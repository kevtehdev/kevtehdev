import type { Dictionary } from "@/content/dictionaries/en";
import { site } from "@/content/site";
import { type Locale, locales, viewPath, views } from "@/lib/i18n";
import { formatCapacity, formatUsage, getProgress, media } from "@/lib/progress";
import type { PromptFile, PromptLabels } from "./Prompt";

/** Everything the client-side prompt needs, resolved on the server. */
export function promptProps(locale: Locale, dict: Dictionary) {
  const progress = getProgress();
  const descriptions: Record<Exclude<(typeof views)[number], "home">, string> = {
    case: dict.case.title,
    now: dict.now.title,
    about: dict.about.title,
    contact: dict.contact.title,
    upgrade: dict.nav.upgrade,
    roadmap: dict.nav.roadmap,
    brief: dict.nav.brief,
    skills: dict.nav.skills,
  };

  const text = contents(locale, dict);
  const files: PromptFile[] = views
    .filter((view) => view !== "home")
    .map((view) => ({
      name: dict.home.files[view as keyof typeof dict.home.files],
      view,
      href: viewPath(locale, view),
      description: descriptions[view as keyof typeof descriptions],
      content: text[view as keyof typeof descriptions],
    }));

  const labels: PromptLabels = {
    label: dict.prompt.label,
    input: dict.prompt.input,
    hint: dict.prompt.hint,
    close: dict.prompt.close,
    volume: dict.prompt.volume(site.wordmark),
    files: dict.prompt.files(files.length, formatUsage(locale, progress.used, progress.current)),
    opening: dict.prompt.opening("{file}"),
    switching: dict.prompt.switching("{language}"),
    tip: dict.prompt.tip("{file}"),
    unknown: dict.prompt.unknown,
    version: dict.prompt.version,
    help: dict.prompt.help,
  };

  const languages = Object.fromEntries(locales.map((l) => [l, dict.language[l]]));

  return { files, homeHref: viewPath(locale, "home"), languages, labels };
}

/**
 * Each page as plain text, for `type <file>` in the prompt. Built from the
 * same dictionary as the pages, so the two never drift apart.
 */
function contents(locale: Locale, dict: Dictionary): Record<Exclude<(typeof views)[number], "home">, string[]> {
  const progress = getProgress();
  const upper = (text: string) => text.toUpperCase();
  const capital = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
  const figures = dict.case.figures.map((figure) => `${figure.value.padEnd(7)}${figure.label}`);
  const number = (n: number) => String(n).padStart(2, "0");
  const usage = formatUsage(locale, progress.used, progress.current);

  return {
    case: [
      upper(dict.case.kicker),
      dict.case.title,
      "",
      dict.case.body,
      "",
      ...figures,
      dict.case.figuresSource,
      "",
      `${dict.case.link}: ${site.latestCase.url}`,
    ],
    now: [
      upper(`${dict.now.correction || dict.now.status} · ${dict.now.due} ${site.nowDue[locale]}`),
      dict.now.title,
      "",
      dict.now.body,
    ],
    about: [upper(dict.about.kicker), dict.about.title, "", dict.about.body],
    contact: [
      upper(dict.contact.kicker),
      dict.contact.title,
      "",
      dict.contact.body,
      "",
      site.email,
      ...site.profiles.map((profile) => `${profile.label}: ${profile.href}`),
    ],
    upgrade: [
      dict.upgrade.title,
      "",
      dict.upgrade.body,
      "",
      `${usage} ${dict.upgrade.used}`,
      "",
      ...site.projects.map((project, i) => `${number(i + 1)} ${project.name} · ${dict.upgrade.status[project.status]}`),
      `${number(site.projects.length + 1)} ${dict.upgrade.yours} · ${dict.upgrade.status.free}`,
      ...(progress.next
        ? ["", dict.upgrade.unlock(progress.next.unlocksAt, dict.upgrade.media[progress.next.id])]
        : []),
    ],
    roadmap: [
      dict.roadmap.title,
      "",
      ...media.map((medium, i) => {
        const status =
          i < progress.index
            ? dict.upgrade.filled
            : i === progress.index
              ? dict.roadmap.here(Math.round((progress.filled / progress.total) * 100))
              : dict.roadmap.at(medium.unlocksAt);
        return `${capital(dict.upgrade.media[medium.id]).padEnd(13)}${formatCapacity(locale, medium).padEnd(9)}${status}`;
      }),
    ],
    brief: [
      upper(dict.brief.kicker),
      dict.brief.title,
      ...dict.brief.sections.flatMap((section) => ["", upper(section.heading), section.body]),
      "",
      upper(dict.brief.results),
      ...figures,
      dict.brief.rankings,
      "",
      upper(dict.brief.stack),
      dict.brief.tools,
    ],
    skills: [
      dict.skills.title,
      "",
      upper(dict.skills.helpHeading),
      ...dict.skills.help.map((item) => `- ${item}`),
      "",
      upper(dict.skills.processHeading),
      ...dict.skills.process.map((item, i) => `${number(i + 1)} ${item.step} · ${item.text}`),
      "",
      upper(dict.skills.toolsHeading),
      ...dict.skills.tools.map((tool) => `${tool.group.padEnd(15)}${tool.list}`),
    ],
  };
}
