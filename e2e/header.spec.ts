import { test, expect } from "@playwright/test";

// Desktop navigation (shown from 1536px): one dropdown open at a time, and clicks outside or Escape close it.
test.describe("desktop navigation", () => {
  test.use({ viewport: { width: 1600, height: 900 } });

  test("opening one dropdown closes the other", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Main" });
    const about = nav.getByRole("button", { name: "About AAAN" });
    const whatWeDo = nav.getByRole("button", { name: "What we do" });

    await about.click();
    await expect(about).toHaveAttribute("aria-expanded", "true");
    await expect(nav.getByRole("link", { name: "Leadership and team" })).toBeVisible();

    await whatWeDo.click();
    await expect(whatWeDo).toHaveAttribute("aria-expanded", "true");
    await expect(about).toHaveAttribute("aria-expanded", "false");
    await expect(nav.getByRole("link", { name: "Leadership and team" })).toBeHidden();
  });

  test("clicking outside the dropdown closes it", async ({ page }) => {
    await page.goto("/en");
    const about = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "About AAAN" });
    await about.click();
    await expect(about).toHaveAttribute("aria-expanded", "true");
    await page.getByRole("heading", { level: 1 }).click();
    await expect(about).toHaveAttribute("aria-expanded", "false");
  });

  test("Escape closes the dropdown", async ({ page }) => {
    await page.goto("/en");
    const about = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "About AAAN" });
    await about.click();
    await page.keyboard.press("Escape");
    await expect(about).toHaveAttribute("aria-expanded", "false");
  });

  test("choosing a link inside a dropdown navigates and closes it", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "About AAAN" }).click();
    await nav.getByRole("link", { name: "Leadership and team" }).click();
    await expect(page).toHaveURL(/\/en\/about\/leadership$/);
    await expect(nav.getByRole("button", { name: "About AAAN" })).toHaveAttribute("aria-expanded", "false");
  });
});

// Phone and tablet menu: a full-width panel that fits the screen and closes after a choice.
test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the menu opens, fits the screen and closes after a link is chosen", async ({ page }) => {
    await page.goto("/en/crops");
    // The button reads "Menu" when closed and "Close" when open, so it is found by what it controls.
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator("#mobile-menu");
    const box = await panel.boundingBox();
    expect(box?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(390);
    expect(box?.height ?? 9999).toBeLessThanOrEqual(844);

    await panel.getByRole("button", { name: "What we do" }).click();
    await expect(panel.getByRole("link", { name: "Seedlings and nurseries" })).toBeVisible();

    await panel.getByRole("link", { name: "Seedlings and nurseries" }).click();
    await expect(page).toHaveURL(/\/en\/what-we-do\/seedlings$/);
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });

  test("the menu closes when the visitor taps outside it", async ({ page }) => {
    await page.goto("/en");
    await page.locator('button[aria-controls="mobile-menu"]').click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    // Tap the dimmed area below the panel (the lower part of the screen).
    await page.mouse.click(195, 790);
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  });
});
