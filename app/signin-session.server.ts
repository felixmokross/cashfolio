import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const signinSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__signin_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSigninSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return signinSessionStorage.getSession(cookie);
}

export async function createSigninSession({
  request,
  url,
  redirectTo,
  codeVerifier,
  state,
}: {
  request: Request;
  url: string;
  redirectTo: string;
  codeVerifier: string;
  state: string;
}) {
  const signinSession = await getSigninSession(request);
  signinSession.flash("redirectTo", redirectTo);
  signinSession.flash("codeVerifier", codeVerifier);
  signinSession.flash("state", state);
  return redirect(url, {
    headers: {
      "Set-Cookie": await signinSessionStorage.commitSession(signinSession),
    },
  });
}
