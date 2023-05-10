import { ManagementClient } from "auth0";
import invariant from "tiny-invariant";

export const playwrightUserPrefix = "playwright_";

export function getPlaywrightUserEmail(name: string) {
  return `${playwrightUserPrefix}${name}@example.com`;
}

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

export const auth0 = new ManagementClient({
  domain: process.env.PLAYWRIGHT_TESTS_AUTH0_DOMAIN!,
  clientId: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_ID!,
  clientSecret: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_SECRET!,
});
