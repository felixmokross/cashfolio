import { test as base } from "@playwright/test";
import fs from "fs";
import path from "path";
import { createUser } from "./common";
import { createId } from "@paralleldrive/cuid2";

export * from "@playwright/test";
export const test = base.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [
    async ({ browser }, use) => {
      // Use parallelIndex as a unique identifier for each worker.
      const id = test.info().parallelIndex;
      const fileName = path.resolve(
        test.info().project.outputDir,
        `.auth/${id}.json`
      );

      if (fs.existsSync(fileName)) {
        // Reuse existing authentication state if any.
        await use(fileName);
        return;
      }

      // Important: make sure we authenticate in a clean environment by unsetting storage state.
      const page = await browser.newPage({ storageState: undefined });

      // Acquire a unique account, for example create a new one.
      // Alternatively, you can have a list of precreated accounts for testing.
      // Make sure that accounts are unique, so that multiple team members
      // can run tests at the same time without interference.
      const user = await createUser(`${createId()}_${id}`);

      // Perform authentication steps. Replace these actions with your own.
      await page.goto("http://localhost:3000/login");
      await page.getByLabel("Email address").fill(user.email);
      await page.getByLabel("Password").fill(user.password);
      await page.getByRole("button", { name: "Continue" }).click();

      // Although we are a first-party application for the IdP
      // user consent is required by Auth0 since we are running on localhost
      // and this is the first login with this user
      await page.getByRole("button", { name: "Accept" }).click();

      await page.waitForURL(/\/$/);

      await page.context().storageState({ path: fileName });
      await page.close();
      await use(fileName);
    },
    { scope: "worker" },
  ],
});
