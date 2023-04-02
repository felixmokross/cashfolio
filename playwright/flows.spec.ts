import { createId } from "@paralleldrive/cuid2";
import { test, expect } from "@playwright/test";
import { getPlaywrightUserEmail } from "./common";

test("sign up new user", async ({ page }) => {
  await page.goto("/signup");

  await expect(page).toHaveTitle(/Sign up | Cashfolio/);

  await page
    .getByLabel("Email address")
    .type(getPlaywrightUserEmail(createId()));
  await page.getByLabel("Password").type("testPassword_1234");

  await page.getByRole("button", { name: "Continue" }).click();

  // Although we are a first-party application for the IdP
  // user consent is required by Auth0 since we are running on localhost
  await page.getByRole("button", { name: "Accept" }).click();

  await expect(
    page.getByRole("heading", { name: "Complete Signup" })
  ).toBeVisible();

  await page.getByRole("combobox", { name: "Main Currency" }).type("CHF");
  await page.getByRole("combobox", { name: "Main Currency" }).press("Enter");

  await page.getByRole("button", { name: "Start Using Cashfolio" }).click();

  await expect(
    page.getByRole("heading", { name: "Hello world!" })
  ).toBeVisible();
});

test("login", async ({ page }) => {
  await page.goto("/other");

  await expect(page).toHaveTitle(/Log in | Cashfolio/);

  await page.getByLabel("Email address").type(getPlaywrightUserEmail("user"));
  await page.getByLabel("Password").type("testPassword_1234");

  await page.getByRole("button", { name: "Continue" }).click();

  // Although we are a first-party application for the IdP
  // user consent is required by Auth0 since we are running on localhost
  await page.getByRole("button", { name: "Accept" }).click();

  await expect(page).toHaveURL(/\/other$/);
});
