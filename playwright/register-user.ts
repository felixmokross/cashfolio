import invariant from "tiny-invariant";
import { auth0, getPlaywrightUserEmail } from "./common";
import { createUser } from "~/users/functions.server";

export async function registerUser(name: string) {
  const email = getPlaywrightUserEmail(name);
  const password = "testPassword_1234";

  const { data: user } = await auth0.users.create({
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
