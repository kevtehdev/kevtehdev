import { expect, test } from "@playwright/test";

test.describe("pages", () => {
  for (const path of ["/en", "/sv", "/en/case", "/en/brief", "/en/skills", "/en/contact", "/sv/roadmap"]) {
    test(`${path} renders on the label`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
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
});

test.describe("navigation", () => {
  test("the sector nav opens a view and marks it current", async ({ page }) => {
    await page.goto("/en");
    await page.getByRole("navigation", { name: "Views" }).getByRole("link", { name: /case/i }).click();
    await expect(page).toHaveURL(/\/en\/case$/);
    await expect(page.getByRole("link", { name: /case/i, exact: false }).first()).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("the language switch keeps the view", async ({ page }) => {
    await page.goto("/en/about");
    await page.getByRole("link", { name: "sv", exact: true }).click();
    await expect(page).toHaveURL(/\/sv\/about$/);
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
