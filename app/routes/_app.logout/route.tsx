import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";
import { getOidcLogoutUrl } from "~/common/auth.server";
import { getSession, sessionStorage } from "~/common/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const authUserId = session.get("userId");
  if (!authUserId) return redirect("/logged-out");

  const idToken = session.get("idToken");

  return redirect(getOidcLogoutUrl(idToken), {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
};
