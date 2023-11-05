import type { LoaderFunction } from "react-router";
import invariant from "tiny-invariant";
import { getOidcClient } from "~/common/auth.server";
import { createUserSession } from "~/common/session.server";
import { getLoginSession } from "~/common/login-session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const oidcClient = await getOidcClient();

  const loginSession = await getLoginSession(request);

  invariant(process.env.BASE_URL, "BASE_URL must be set");

  const params = oidcClient.callbackParams(request.url);
  const tokenSet = await oidcClient.callback(
    `${process.env.BASE_URL}/callback`,
    params,
    {
      code_verifier: loginSession.get("codeVerifier"),
      state: loginSession.get("state"),
    },
  );

  const claims = tokenSet.claims();

  invariant(tokenSet.id_token, "tokenSet does not have id_token!");
  return await createUserSession({
    request,
    redirectTo: loginSession.get("redirectTo") || "/",
    userId: claims.sub,
    idToken: tokenSet.id_token,
  });
};
