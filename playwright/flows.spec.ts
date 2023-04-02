import { createId } from "@paralleldrive/cuid2";
import { expect } from "@playwright/test";
import { createUser, getPlaywrightUserEmail, test } from "./common";

test("home page", async ({ loggedInPage }) => {
  await loggedInPage.goto("/");
  await expect(loggedInPage.getByText("Hello world!")).toBeVisible();
});

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
  const userName = createId();
  await createUser(userName);

  await page.goto("/other");

  await expect(page).toHaveTitle(/Log in | Cashfolio/);

  await page.getByLabel("Email address").type(getPlaywrightUserEmail(userName));
  await page.getByLabel("Password").type("testPassword_1234");

  await page.getByRole("button", { name: "Continue" }).click();

  // Although we are a first-party application for the IdP
  // user consent is required by Auth0 since we are running on localhost
  // and this is the first login with this user
  await page.getByRole("button", { name: "Accept" }).click();

  await expect(page).toHaveURL(/\/other$/);
});

test("logout", async ({ loggedInPage }) => {
  await loggedInPage.goto("/");
  await loggedInPage.getByRole("link", { name: /Log Out/ }).click();

  await expect(loggedInPage).toHaveURL(/\/logged-out$/);

  await loggedInPage.goto("/");
  await expect(loggedInPage).toHaveTitle(/Log in | Cashfolio/);
});
