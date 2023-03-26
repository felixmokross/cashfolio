import type { LoaderFunction } from "react-router";
import { generators } from "openid-client";
import { createSigninSession } from "~/signin-session.server";
import { safeRedirect } from "~/utils";
import { createId } from "@paralleldrive/cuid2";
import { getOidcClient } from "~/auth.server";
import { getSession } from "~/session.server";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

  // do not execute this loader if we are already signed in
  const session = await getSession(request);
  const userId = session.get("userId");
  if (userId) {
    return redirect(redirectTo);
  }

  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  const state = createId();

  const oidcClient = await getOidcClient();

  const url = oidcClient.authorizationUrl({
    scope: "openid email profile",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return await createSigninSession({
    request,
    url,
    redirectTo,
    codeVerifier,
    state,
  });
};
