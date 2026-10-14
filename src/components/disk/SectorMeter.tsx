import type { Sector } from "@/lib/progress";

const cell: Record<Sector, string> = {
  shipped: "border-current bg-current",
  writing: "border-current hatch",
  free: "border-current opacity-50",
};

/**
 * Disk usage as a row of sectors: filled for shipped projects, hatched for
 * ones being written, empty for free space. Purely visual; callers put the
 * numbers in text next to it.
 */
export function SectorMeter({
  sectors,
  size = "sm",
  live = false,
}: {
  sectors: Sector[];
  size?: "sm" | "lg";
  /** Pulse the sector being written while the surrounding link is hovered. */
  live?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={
        size === "lg" ? "grid h-[calc(var(--line)*0.5)] w-full gap-[1cqw]" : "inline-flex gap-[3px] align-[-1px]"
      }
      style={size === "lg" ? { gridTemplateColumns: `repeat(${sectors.length}, minmax(0, 1fr))` } : undefined}
    >
      {sectors.map((sector, i) => (
        <span
          key={i}
          className={[
            "border",
            size === "lg" ? "" : "size-[0.5625rem]",
            cell[sector],
            live && sector === "writing" ? "group-hover:animate-pulse group-focus-visible:animate-pulse" : "",
          ].join(" ")}
        />
      ))}
    </span>
  );
}
