import { createId } from "@paralleldrive/cuid2";
import type { TypedResponse } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { generators, Issuer, TokenSet } from "openid-client";
import invariant from "tiny-invariant";
import { getUserByAuth0UserId } from "./models/users.server";
import { getSession } from "./session.server";
import { createLoginSession } from "./login-session.server";
import { safeRedirect } from "./utils";
import type { User } from "@prisma/client";

export async function authorize(
  request: Request,
  mode: AuthorizeMode = "login"
): Promise<TypedResponse> {
  const redirectTo = safeRedirect(
    new URL(request.url).searchParams.get("redirectTo")
  );

  // do not execute this loader if we are already logged in
  const session = await getSession(request);
  const userId = session.get("userId");
  if (userId) {
    return redirect(redirectTo);
  }

  const codeVerifier = generators.codeVerifier();
  const codeChallenge = generators.codeChallenge(codeVerifier);
  const state = createId();

  const oidcClient = await getOidcClient();

  const url = new URL(
    oidcClient.authorizationUrl({
      scope: "openid email profile",
      state,
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    })
  );

  if (mode === "signup") {
    url.searchParams.set("screen_hint", "signup");
  }

  return await createLoginSession({
    request,
    url: url.toString(),
    redirectTo,
    codeVerifier,
    state,
  });
}

type AuthorizeMode = "signup" | "login";

export async function getUser(request: Request) {
  const session = await getSession(request);
  const userId = session.get("userId");
  if (!userId) {
    throw redirect(`/login?redirectTo=${encodeURIComponent(request.url)}`);
  }

  const user = await getUserByAuth0UserId(userId);
  if (!user) {
    throw redirect(`/signup?redirectTo=${encodeURIComponent(request.url)}`);
  }

  const claims = new TokenSet({ id_token: session.get("idToken") }).claims();
  return {
    ...user,
    email: claims.email,
    pictureUrl: claims.picture,
  } as ExtendedUser;
}

export type ExtendedUser = User & {
  email: string;
  pictureUrl: string;
};

export async function getOidcClient() {
  invariant(process.env.OIDC_ISSUER, "OIDC_ISSUER not set");
  invariant(process.env.OIDC_CLIENT_ID, "OIDC_CLIENT_ID not set");
  invariant(process.env.OIDC_CLIENT_SECRET, "OIDC_CLIENT_SECRET not set");
  invariant(process.env.BASE_URL, "BASE_URL not set");

  const issuer = await Issuer.discover(process.env.OIDC_ISSUER);
  const client = new issuer.Client({
    client_id: process.env.OIDC_CLIENT_ID,
    client_secret: process.env.OIDC_CLIENT_SECRET,
    redirect_uris: [`${process.env.BASE_URL}/callback`],
    response_types: ["code"],
  });

  return client;
}

export function getOidcLogoutUrl(idToken: string) {
  invariant(process.env.OIDC_ISSUER, "OIDC_ISSUER not set");
  invariant(process.env.BASE_URL, "BASE_URL not set");

  // Auth0 does not provide the logout endpoint via OIDC discovery
  return `${
    process.env.OIDC_ISSUER
  }/oidc/logout?id_token_hint=${encodeURIComponent(
    idToken
  )}&post_logout_redirect_uri=${encodeURIComponent(
    `${process.env.BASE_URL}/logged-out`
  )}`;
}
