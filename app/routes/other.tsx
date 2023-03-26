import { json } from "@remix-run/node";
import { withAuth } from "~/auth.server";

export const loader = withAuth(async function loader({ userId }) {
  return json({ user: userId });
});

export default function Other() {
  return <h1>Other</h1>;
}
