import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/en", "/sv", "/en/case", "/en/brief", "/en/skills", "/en/contact", "/sv/about", "/sv/now"];

test.describe("pages", () => {
  for (const path of pages) {
    test(`${path} renders`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main h1")).not.toBeEmpty();
    });
  }

  test("/ sends visitors to English", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveURL(/\/en$/);
  });

  test("an unknown view is a 404", async ({ page }) => {
    const response = await page.goto("/en/nope");
    expect(response?.status()).toBe(404);
  });

  test("pages from the diskette version go home", async ({ page }) => {
    await page.goto("/sv/roadmap");
    await expect(page).toHaveURL(/\/sv$/);
  });
});

test.describe("navigation", () => {
  test("the menu opens a view and marks it current", async ({ page }) => {
    await page.goto("/en");
    const menu = page.getByRole("navigation", { name: "Main menu" });
    await menu.getByRole("link", { name: "Case" }).click();
    await expect(page).toHaveURL(/\/en\/case$/);
    await expect(menu.getByRole("link", { name: "Case" })).toHaveAttribute("aria-current", "page");
  });

  test("a page opened from a view keeps its parent current", async ({ page }) => {
    await page.goto("/en/brief");
    const menu = page.getByRole("navigation", { name: "Main menu" });
    await expect(menu.getByRole("link", { name: "Case" })).toHaveAttribute("aria-current", "page");
  });

  test("the language switch keeps the view", async ({ page }) => {
    await page.goto("/en/about");
    await page.getByRole("link", { name: "sv", exact: true }).click();
    await expect(page).toHaveURL(/\/sv\/about$/);
  });
});

test.describe("intro", () => {
  test.use({ reducedMotion: "no-preference" });

  test("plays once per visit, then hands the wordmark to the header", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-intro", "play");
    await expect(page.locator("#intro")).toBeVisible();
    await expect(page.locator("#intro")).toBeHidden({ timeout: 5000 });
    await expect(page.locator("#site-mark")).toBeVisible();

    await page.goto("/en/case");
    await expect(page.locator("#intro")).toBeHidden();
  });
});

test.describe("accessibility", () => {
  for (const path of pages) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      expect(violations.map(({ id, nodes }) => `${id}: ${nodes.map((node) => node.target).join(", ")}`)).toEqual([]);
    });
  }

  test("dark mode has no contrast problems", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/en");
    const { violations } = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    expect(violations.map(({ id }) => id)).toEqual([]);
  });
});

test.describe("metadata", () => {
  test("robots, sitemap and the share image are served", async ({ request }) => {
    expect((await request.get("/robots.txt")).status()).toBe(200);
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(await sitemap.text()).toContain("/sv/case");
    const image = await request.get("/en/opengraph-image");
    expect(image.headers()["content-type"]).toBe("image/png");
  });
});
