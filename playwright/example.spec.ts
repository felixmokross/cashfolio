import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/logged-out");

  await expect(page).toHaveTitle(/Cashfolio/);
});
