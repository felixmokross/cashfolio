import { test } from "@playwright/test";
import { cleanPlaywrightUsers } from "./common";

test("setup", async () => {
  // TODO this doesn't really have to be a setup task, not critical for the tests. Consider to set up separate GitHub Actions workflow
  await cleanPlaywrightUsers();
});
