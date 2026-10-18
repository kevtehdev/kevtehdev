import type { Dictionary } from "@/content/dictionaries/en";

/**
 * Everything I offer, as cells divided by hairlines: three across on wide
 * screens, two on tablets, one on phones. The lines are the 1px gap showing
 * the rule colour through. Used on Home and on Skills.
 */
export function Services({ services }: { services: Dictionary["services"] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule">
      <ul className="grid gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item) => (
          <li key={item.title} className="flex flex-col gap-2 bg-bg p-6">
            <span className="font-mono text-xs text-muted">{item.tag}</span>
            <h3 className="pt-3 font-display text-xl leading-tight font-semibold tracking-[-0.01em]">{item.title}</h3>
            <p className="max-w-[40ch] leading-relaxed text-pretty text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
