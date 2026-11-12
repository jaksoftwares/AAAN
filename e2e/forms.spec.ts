import { test, expect } from "@playwright/test";

// Validation tests never reach the database: the server rejects the input before saving.
// Fields are targeted by id, because some labels carry a "(required)" suffix.

// The server rate-limits submissions per client IP (5 enquiries an hour). Every test runs from
// the same machine, so each worker sends its own forwarded address to keep the counts apart.
const workerIp = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${1 + Math.floor(Math.random() * 250)}`;
test.use({ extraHTTPHeaders: { "x-forwarded-for": workerIp } });

test("contact form shows errors beside each missing field", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await expect(page.locator("#type-error")).toBeVisible();
  await expect(page.locator("#name-error")).toHaveText("This field is required.");
  await expect(page.locator("#email-error")).toBeVisible();
  await expect(page.locator("#consent-error")).toBeVisible();
  await expect(page.locator("#name")).toHaveAttribute("aria-invalid", "true");
});

test("contact form keeps what the visitor typed when validation fails", async ({ page }) => {
  await page.goto("/en/contact");
  await page.locator("#name").fill("Amina Osei");
  await page.locator("#email").fill("not-an-email");
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await expect(page.locator("#email-error")).toContainText("valid email address");
  await expect(page.locator("#name")).toHaveValue("Amina Osei");
});

test("quote request reports the missing consent tick", async ({ page }) => {
  await page.goto("/en/request-a-quote");
  // Wait for the page scripts to finish loading, so the submit uses the form's action handler, not a plain page post.
  await page.waitForLoadState("networkidle");
  await page.locator("#name").fill("Amina Osei");
  await page.locator("#email").fill("amina@example.com");
  await page.locator("#message").fill("Cocoa beans for April.");
  await page.getByRole("button", { name: "Request a quote" }).click();
  // The server action can take a moment under parallel load, so allow longer than the default.
  await expect(page.locator("#consent-error")).toBeVisible({ timeout: 15_000 });
});

test("farmer sign-up needs at least one crop", async ({ page }) => {
  await page.goto("/en/join#sign-up");
  await page.locator("#fullName").fill("Joseph Kariuki");
  await page.locator("#phone").fill("+254 702 998 260");
  await page.locator("#country").selectOption("Kenya");
  await page.locator("#hub").fill("Ol Kalou");
  await page.locator("#farmSize").fill("2");
  await page.locator("#farmUnit").selectOption("acres");
  await page.locator("#cooperativeMember").selectOption("no");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Join the network" }).click();
  await expect(page.getByText("Please choose at least one crop you grow.")).toBeVisible();
});

test("newsletter rejects an invalid address", async ({ page }) => {
  await page.goto("/en/news");
  const form = page.locator('form[aria-label="Newsletter sign-up"]').first();
  await form.getByRole("textbox", { name: "Email address" }).fill("nope");
  await form.locator('input[type="checkbox"]').check();
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.getByText(/valid email address/)).toBeVisible();
});

test("honeypot field is hidden from people and skipped by the keyboard", async ({ page }) => {
  await page.goto("/en/contact");
  const trap = page.locator('input[name="website"]').first();
  await expect(trap).toHaveAttribute("tabindex", "-1");
  // The field sits in a container hidden from assistive technology and moved off-screen.
  const hiddenContainer = trap.locator("xpath=.."); 
  await expect(hiddenContainer).toHaveAttribute("aria-hidden", "true");
});

test("every element id on a page is unique", async ({ page }) => {
  for (const route of ["/en/news", "/en/contact", "/en"]) {
    await page.goto(route);
    const duplicates = await page.evaluate(() => {
      const seen = new Map<string, number>();
      document.querySelectorAll("[id]").forEach((el) => seen.set(el.id, (seen.get(el.id) ?? 0) + 1));
      return [...seen].filter(([, n]) => n > 1).map(([id]) => id);
    });
    expect(duplicates, `duplicate ids on ${route}`).toEqual([]);
  }
});

test("a failed submit says how many fields need attention and moves focus to the first one", async ({ page }) => {
  await page.goto("/en/contact");
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await expect(page.getByText(/Please check the \d+ fields highlighted below\./)).toBeVisible();
  await expect(page.locator("#type")).toBeFocused();
});

test("a farmer sign-up without a crop moves focus to the summary", async ({ page }) => {
  await page.goto("/en/join#sign-up");
  await page.locator("#fullName").fill("Joseph Kariuki");
  await page.locator("#phone").fill("+254 702 998 260");
  await page.locator("#country").selectOption("Kenya");
  await page.locator("#hub").fill("Ol Kalou");
  await page.locator("#farmSize").fill("2");
  await page.locator("#farmUnit").selectOption("acres");
  await page.locator("#cooperativeMember").selectOption("no");
  await page.locator("#consent").check();
  await page.getByRole("button", { name: "Join the network" }).click();
  await expect(page.getByText("Please choose at least one crop you grow.")).toBeVisible();
  await expect(page.locator("[data-error-summary]")).toBeFocused();
});

test("the newsletter moves focus to the email field when the address is wrong", async ({ page }) => {
  await page.goto("/en/news");
  const form = page.locator('form[aria-label="Newsletter sign-up"]').first();
  await form.getByRole("textbox", { name: "Email address" }).fill("nope");
  await form.locator('input[type="checkbox"]').check();
  await form.getByRole("button", { name: "Subscribe" }).click();
  await expect(form.getByRole("textbox", { name: "Email address" })).toBeFocused();
});

// Writes a row to the database. Only run when pointed at a test project on purpose.
test.describe("valid submissions (writes data, opt-in)", () => {
  test.skip(process.env.E2E_ALLOW_WRITES !== "true", "Set E2E_ALLOW_WRITES=true to run submissions that save data.");

  test("valid enquiry goes to the thank-you page", async ({ page }) => {
    await page.goto("/en/request-a-quote");
    await page.locator("#name").fill("Test Buyer");
    await page.locator("#email").fill("e2e-test@example.com");
    await page.locator("#message").fill("Automated test enquiry. Please ignore.");
    await page.locator("#consent").check();
    await page.getByRole("button", { name: "Request a quote" }).click();
    await expect(page).toHaveURL(/thank-you\?kind=quote/);
  });
});
