import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/auth.server";

export const loader = async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({ user: user.auth0UserId });
};

export default function Other() {
  return <h1>Other</h1>;
}
