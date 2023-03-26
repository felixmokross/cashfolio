import type { LoaderFunction } from "react-router";
import invariant from "tiny-invariant";
import { getOidcClient } from "~/oidc.server";
import { createUserSession } from "~/session.server";
import { getSigninSession } from "~/signin-session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const oidcClient = await getOidcClient();

  const signinSession = await getSigninSession(request);

  invariant(process.env.BASE_URL, "BASE_URL must be set");

  const params = oidcClient.callbackParams(request.url);
  const tokenSet = await oidcClient.callback(
    `${process.env.BASE_URL}/callback`,
    params,
    {
      code_verifier: signinSession.get("codeVerifier"),
      state: signinSession.get("state"),
    }
  );

  const claims = tokenSet.claims();

  invariant(tokenSet.id_token, "tokenSet does not have id_token!");
  return await createUserSession({
    request,
    redirectTo: signinSession.get("redirectTo") || "/",
    userId: claims.sub,
    idToken: tokenSet.id_token,
  });
};
