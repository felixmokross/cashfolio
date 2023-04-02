import { ManagementClient } from "auth0";
import invariant from "tiny-invariant";
import { prisma } from "~/prisma.server";

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
  const users = await getPlaywrightUsers();
  for (const user of users) {
    invariant(user.user_id, "user must have a user_id");

    console.log(`Deleting user ${user.email}`);
    await auth0.deleteUser({ id: user.user_id });
  }
}

export async function createUser(name: string) {
  const email = getPlaywrightUserEmail(name);
  const password = "testPassword_1234";

  const user = await auth0.createUser({
    connection: "Username-Password-Authentication",
    email,
    password,
  });

  invariant(user.user_id, "User ID must be set!");
  await prisma.user.create({
    data: { auth0UserId: user.user_id },
  });

  return { email, password };
}

export async function getPlaywrightUsers() {
  return (await auth0.getUsers()).filter((u) =>
    u.email?.toLowerCase().startsWith(playwrightUserPrefix.toLowerCase())
  );
}
