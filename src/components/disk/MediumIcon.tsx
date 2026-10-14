import type { Medium } from "@/lib/progress";

/**
 * A tiny drawing of each storage medium for the upgrade path. Unlocked media
 * are drawn solid; locked ones are a dashed silhouette of the same shape.
 */
export function MediumIcon({ medium, locked }: { medium: Medium; locked: boolean }) {
  const line = locked ? "border border-dashed border-pencil" : "";

  switch (medium) {
    case "floppy":
      return locked ? (
        <span className={`block size-[80%] ${line}`} />
      ) : (
        <span className="relative block size-[80%] bg-ink disk-shape">
          <span className="absolute inset-x-[22%] top-0 h-[30%] bg-metal" />
          <span className="absolute inset-x-[12%] top-[42%] bottom-[12%] bg-label" />
        </span>
      );
    case "cdrom":
      return (
        <span
          className={`relative block size-[90%] rounded-full ${locked ? line : "border border-metal-edge disc-sheen"}`}
        >
          <span className={`absolute inset-[38%] rounded-full ${locked ? line : "bg-label"}`} />
        </span>
      );
    case "hdd":
      return (
        <span className={`relative block h-[90%] w-[70%] rounded-[2px] ${locked ? line : "bg-metal"}`}>
          {!locked && (
            <span className="absolute inset-x-[15%] top-[10%] aspect-square rounded-full border border-metal-edge bg-label" />
          )}
        </span>
      );
    case "ssd":
      return <span className={`block h-[45%] w-full rounded-[2px] ${locked ? line : "bg-ink"}`} />;
    case "server":
      return (
        <span className="flex h-[90%] w-[80%] flex-col gap-[12%]">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`block flex-1 rounded-[1px] ${locked ? line : "bg-ink"}`} />
          ))}
        </span>
      );
  }
}
