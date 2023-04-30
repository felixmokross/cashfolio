import { createId } from "@paralleldrive/cuid2";
import { registerUser, getPlaywrightUserEmail } from "./common";
import { test, expect } from "./fixtures";

test("home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Hello world!")).toBeVisible();
});

test("logout", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open Main Menu" }).click();
  await page.getByRole("link", { name: /Log Out/ }).click();

  await expect(page).toHaveURL(/\/logged-out$/);

  await page.goto("/");
  await expect(page).toHaveTitle(/Log in | Cashfolio/);
});

test.describe("unauthenticated", () => {
  test.use({ authenticated: false });

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

  test("login with redirect", async ({ page }) => {
    const user = await registerUser(createId());

    await page.goto("/other");

    await expect(page).toHaveTitle(/Log in | Cashfolio/);

    await page.getByLabel("Email address").type(user.email);
    await page.getByLabel("Password").type(user.password);

    await page.getByRole("button", { name: "Continue" }).click();

    // Although we are a first-party application for the IdP
    // user consent is required by Auth0 since we are running on localhost
    // and this is the first login with this user
    await page.getByRole("button", { name: "Accept" }).click();

    await expect(page).toHaveURL(/\/other$/);
  });
});
