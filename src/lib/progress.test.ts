import { describe, expect, it } from "vitest";
import { formatUsage, getProgress, media } from "./progress";

const shipped = (count: number) => Array.from({ length: count }, () => ({ status: "shipped" as const }));
const writing = (count: number) => Array.from({ length: count }, () => ({ status: "writing" as const }));

describe("getProgress", () => {
  it("starts on the floppy with every sector free", () => {
    const progress = getProgress([]);
    expect(progress.current.id).toBe("floppy");
    expect(progress.sectors).toEqual(["free", "free", "free", "free", "free"]);
    expect(progress.toGo).toBe(5);
  });

  it("fills shipped sectors first, then writing ones", () => {
    const progress = getProgress([...shipped(1), ...writing(1)]);
    expect(progress.sectors).toEqual(["shipped", "writing", "free", "free", "free"]);
    expect(progress.used).toBeCloseTo(1.44 / 5);
    expect(progress.toGo).toBe(4);
  });

  it("upgrades to the CD-ROM at exactly 5 shipped projects", () => {
    expect(getProgress(shipped(4)).current.id).toBe("floppy");

    const progress = getProgress(shipped(5));
    expect(progress.current.id).toBe("cdrom");
    expect(progress.previous?.id).toBe("floppy");
    expect(progress.next?.id).toBe("hdd");
    expect(progress.filled).toBe(0);
    expect(progress.total).toBe(10);
  });

  it("never shows more writing sectors than there are", () => {
    expect(getProgress([...shipped(3), ...writing(4)]).sectors).toEqual([
      "shipped",
      "shipped",
      "shipped",
      "writing",
      "writing",
    ]);
  });

  it("stays full on the last medium", () => {
    const progress = getProgress(shipped(150));
    expect(progress.current.id).toBe(media.at(-1)?.id);
    expect(progress.next).toBeUndefined();
    expect(progress.toGo).toBe(0);
    expect(progress.sectors).toEqual(["shipped"]);
  });

  it("previews a later medium, and ignores unknown names", () => {
    expect(getProgress(shipped(1), "cdrom").current.id).toBe("cdrom");
    expect(getProgress(shipped(1), "nope").current.id).toBe("floppy");
  });
});

describe("formatUsage", () => {
  it("uses the locale's decimal separator", () => {
    expect(formatUsage("en", 0.288, media[0])).toBe("0.29 / 1.44 MB");
    expect(formatUsage("sv", 0.288, media[0])).toBe("0,29 / 1,44 MB");
  });
});
