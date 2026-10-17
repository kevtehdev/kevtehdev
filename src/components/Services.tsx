import type { Dictionary } from "@/content/dictionaries/en";

/**
 * Everything I offer, as one grid: three across on wide screens, two on
 * tablets, one on phones. Each item gets a rule on top rather than a card,
 * so the grid reads as one list. Used on Home and on Skills.
 */
export function Services({ services }: { services: Dictionary["services"] }) {
  return (
    <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.items.map((item) => (
        <li key={item.title} className="flex flex-col gap-2 border-t border-fg pt-4">
          <h3 className="font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{item.title}</h3>
          <p className="max-w-[40ch] leading-relaxed text-pretty text-muted">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
