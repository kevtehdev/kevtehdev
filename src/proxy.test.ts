import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { proxy } from "./proxy";

const run = (path: string) => proxy(new NextRequest(`https://kevdev.codes${path}`));

describe("proxy", () => {
  it("sends URLs without a locale to English", () => {
    expect(run("/")?.headers.get("location")).toBe("https://kevdev.codes/en");
    expect(run("/case")?.headers.get("location")).toBe("https://kevdev.codes/en/case");
  });

  it("lets known views through", () => {
    for (const path of ["/en", "/sv", "/en/case", "/sv/brief", "/en/skills"]) {
      expect(run(path)).toBeUndefined();
    }
  });

  it("lets metadata routes beside the views through", () => {
    expect(run("/en/opengraph-image")).toBeUndefined();
  });

  it("shows the prerendered 404 for unknown views", () => {
    for (const path of ["/en/nope", "/en/home", "/en/case/extra"]) {
      expect(run(path)?.headers.get("x-middleware-rewrite")).toBe("https://kevdev.codes/en/404");
    }
  });
});
