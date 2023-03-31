import { test, expect } from "@playwright/test";
import { ManagementClient } from "auth0";
import invariant from "tiny-invariant";

test("has title", async ({ page }) => {
  await page.goto(`${process.env.BASE_URL}/logged-out`);

  await expect(page).toHaveTitle(/Cashfolio/);
});

test("sign up new user", async ({ page }) => {
  await resetAuth0();

  await page.goto(`${process.env.BASE_URL}/signup`);

  await expect(page).toHaveTitle(/Sign up | Cashfolio/);

  await page.getByLabel("Email address").fill(`test@example.com`);
  await page.getByLabel("Password").fill("testPassword_1234");

  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "Accept" }).click();

  await expect(
    page.getByRole("heading", { name: "Complete Signup" })
  ).toBeVisible();
});

async function resetAuth0() {
  const auth0 = getAuth0();

  await deleteAllUsers();

  async function deleteAllUsers() {
    const users = await auth0.getUsers();
    for (const user of users) {
      invariant(user.user_id, "user must have a user_id");
      await auth0.deleteUser({ id: user.user_id });
    }
  }
}

function getAuth0() {
  invariant(
    process.env.PLAYWRIGHT_TESTS_AUTH0_DOMAIN,
    "PLAYWRIGHT_TESTS_AUTH0_DOMAIN must be set"
  );
  invariant(
    process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_ID,
    "PLAYWRIGHT_TESTS_AUTH0_CLIENT_ID must be set"
  );
  invariant(
    process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_SECRET,
    "PLAYWRIGHT_TESTS_AUTH0_CLIENT_SECRET must be set"
  );

  return new ManagementClient({
    domain: process.env.PLAYWRIGHT_TESTS_AUTH0_DOMAIN!,
    clientId: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_ID!,
    clientSecret: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_SECRET!,
  });
}
