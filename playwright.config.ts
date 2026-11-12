import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

// Tests run against the production build, which is what visitors receive.
// Build first with `npm run build`, or let the webServer step reuse a running server.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never", outputFolder: "e2e-report" }]],
  outputDir: "e2e-results",
  use: {
    baseURL: `http://localhost:${PORT}`,
    // The cookie notice is dismissed in advance, so it never covers the controls under test.
    storageState: "e2e/storage-state.json",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}/en`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
