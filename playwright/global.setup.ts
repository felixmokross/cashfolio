import { test } from "@playwright/test";
import { cleanPlaywrightUsers } from "./common";

test("setup", async () => {
  await cleanPlaywrightUsers();
});
