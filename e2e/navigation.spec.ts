import { test, expect } from "@playwright/test";

const publicRoutes = [
  "/en",
  "/en/about",
  "/en/about/leadership",
  "/en/what-we-do",
  "/en/what-we-do/seedlings",
  "/en/what-we-do/farming-and-technology",
  "/en/what-we-do/value-addition",
  "/en/what-we-do/export-and-trade",
  "/en/what-we-do/farmer-network",
  "/en/crops",
  "/en/crops/cocoa",
  "/en/crops/cashew-nuts",
  "/en/crops/oil-palm",
  "/en/crops/cassava",
  "/en/crops/yams",
  "/en/crops/plantains",
  "/en/crops/bananas",
  "/en/crops/pineapples",
  "/en/crops/maize",
  "/en/crops/irish-potatoes",
  "/en/crops/dairy",
  "/en/crops/vegetables",
  "/en/where-we-operate",
  "/en/sustainability",
  "/en/quality",
  "/en/partners",
  "/en/join",
  "/en/contact",
  "/en/request-a-quote",
  "/en/careers",
  "/en/news",
  "/en/news/aaan-launches-new-website",
  "/en/news/cashew-processing-comes-to-bouake",
  "/en/news/every-cocoa-farm-mapped-for-the-eudr",
  "/en/search?q=cocoa",
  "/en/privacy",
  "/en/cookies",
  "/en/terms",
  "/en/thank-you?kind=quote",
];

test("root redirects to the English site", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});

for (const route of publicRoutes) {
  test(`${route} renders one h1 and no console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(errors, `console errors on ${route}`).toEqual([]);
    // Nothing may push the page wider than the screen (catches overflowing headers, tables and images).
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(0);
  });
}

test("unknown pages show the 404 copy", async ({ page }) => {
  const response = await page.goto("/en/nothing-here");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page has not been planted yet.");
});

test("crop filter on the crops page narrows the list", async ({ page }) => {
  await page.goto("/en/crops?family=Fruit");
  const filter = page.getByRole("navigation", { name: "Filter crops by family" });
  await expect(filter.getByRole("link", { name: "Fruit" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("heading", { name: "Bananas" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Cocoa" })).toHaveCount(0);
});

test("navigation reaches a crop page and its quote call to action", async ({ page }) => {
  await page.goto("/en/crops");
  await page.getByRole("link", { name: /Explore cocoa/ }).click();
  await expect(page).toHaveURL(/\/en\/crops\/cocoa$/);
  await page.getByRole("main").getByRole("link", { name: "Request a quote" }).first().click();
  await expect(page).toHaveURL(/\/en\/request-a-quote$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Tell us the product");
});

test("contact link can preselect a reason from the partner page", async ({ page }) => {
  await page.goto("/en/contact?reason=partnership");
  await expect(page.locator("#type")).toHaveValue("partnership");
});

test("contact page shows the Nairobi head office details", async ({ page }) => {
  await page.goto("/en/contact");
  const main = page.getByRole("main");
  await expect(main.getByText("+254 702 998 260")).toBeVisible();
  await expect(main.getByText("Upper Hill, Nairobi")).toBeVisible();
});

test("search finds a crop and says when nothing matches", async ({ page }) => {
  await page.goto("/en/search?q=cashew");
  await expect(page.getByRole("main").getByRole("link", { name: "Cashew nuts" })).toBeVisible();
  await page.goto("/en/search?q=zzzzzz");
  await expect(page.getByText(/No results for/)).toBeVisible();
});
