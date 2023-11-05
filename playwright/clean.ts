import invariant from "tiny-invariant";
import { auth0, playwrightUserPrefix } from "./common";
import { differenceInHours } from "date-fns";

cleanPlaywrightUsers();

export async function cleanPlaywrightUsers() {
  const users = await getObsoletePlaywrightUsers();
  if (users.length === 0) {
    console.log("No obsolete users found.");
    return;
  }

  console.log(`Found ${users.length} obsolete users.`);

  for (const user of users) {
    invariant(user.user_id, "user must have a user_id");

    console.log(`Deleting obsolete user ${user.email}`);
    await auth0.users.delete({ id: user.user_id });
  }
}

export async function getObsoletePlaywrightUsers() {
  return (await auth0.users.getAll()).data.filter(
    (u) =>
      u.email?.toLowerCase().startsWith(playwrightUserPrefix.toLowerCase()) &&
      differenceInHours(new Date(), new Date(u.created_at as string)) > 3
  );
}
