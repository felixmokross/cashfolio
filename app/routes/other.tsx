import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "react-router";
import { getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = session.get("userId");
  const url = new URL(request.url);
  if (!user) {
    return redirect(
      `/signin?redirectTo=${encodeURIComponent(url.pathname + url.search)}`
    );
  }

  return json({ user });
};

export default function Other() {
  return <h1>Other</h1>;
}
