import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/en", "/en/contact", "/en/crops/cocoa", "/en/join", "/en/about/leadership", "/en/news"];

for (const route of pages) {
  test(`${route} has no serious or critical accessibility issues`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag22aa"]).analyze();
    const blocking = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    const summary = blocking.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s)`);
    expect(summary, `axe on ${route}`).toEqual([]);
  });
}

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/en");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});
