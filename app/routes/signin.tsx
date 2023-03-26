import type { LoaderFunction } from "react-router";
import { generators } from "openid-client";
import { createSigninSession } from "~/signin-session.server";
import { safeRedirect } from "~/utils";
import { createId } from "@paralleldrive/cuid2";
import { getOidcClient } from "~/oidc.server";

export const loader: LoaderFunction = async ({ request }) => {
  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  const state = createId();

  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

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
