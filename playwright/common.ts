import { ManagementClient } from "auth0";
import { differenceInHours } from "date-fns";
import invariant from "tiny-invariant";
import { createUser } from "~/models/users.server";

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

const auth0 = new ManagementClient({
  domain: process.env.PLAYWRIGHT_TESTS_AUTH0_DOMAIN!,
  clientId: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_ID!,
  clientSecret: process.env.PLAYWRIGHT_TESTS_AUTH0_CLIENT_SECRET!,
});

export async function cleanPlaywrightUsers() {
  const users = await getObsoletePlaywrightUsers();
  for (const user of users) {
    invariant(user.user_id, "user must have a user_id");

    console.log(`Deleting obsolete user ${user.email}`);
    await auth0.deleteUser({ id: user.user_id });
  }
}

export async function registerUser(name: string) {
  const email = getPlaywrightUserEmail(name);
  const password = "testPassword_1234";

  const user = await auth0.createUser({
    connection: "Username-Password-Authentication",
    email,
    password,
  });

  invariant(user.user_id, "User ID must be set!");
  await createUser({
    auth0UserId: user.user_id,
    preferredLocale: "en",
    refCurrency: "USD",
  });

  return { email, password };
}

export async function getObsoletePlaywrightUsers() {
  return (await auth0.getUsers()).filter(
    (u) =>
      u.email?.toLowerCase().startsWith(playwrightUserPrefix.toLowerCase()) &&
      differenceInHours(new Date(), new Date(u.created_at!)) > 3
  );
}
