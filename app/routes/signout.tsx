import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";
import { getOidcLogoutUrl } from "~/auth.server";
import { getSession, sessionStorage } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) return redirect("/signed-out");

  const idToken = session.get("idToken");

  return redirect(getOidcLogoutUrl(idToken), {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
};
