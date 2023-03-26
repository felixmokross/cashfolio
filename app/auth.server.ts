import type { DataFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Issuer } from "openid-client";
import invariant from "tiny-invariant";
import { getSession } from "./session.server";

export function withAuth<TResult>(
  callback: (args: DataFunctionArgs & { userId: string }) => Promise<TResult>
) {
  return async (args: DataFunctionArgs) => {
    const session = await getSession(args.request);
    const userId = session.get("userId");
    if (!userId) return redirect("/signin");

    return await callback({ ...args, userId });
  };
}

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
    `${process.env.BASE_URL}/signed-out`
  )}`;
}
