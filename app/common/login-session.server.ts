import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const loginSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__login_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getLoginSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return loginSessionStorage.getSession(cookie);
}

export async function createLoginSession({
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
  const loginSession = await getLoginSession(request);
  loginSession.flash("redirectTo", redirectTo);
  loginSession.flash("codeVerifier", codeVerifier);
  loginSession.flash("state", state);
  return redirect(url, {
    headers: {
      "Set-Cookie": await loginSessionStorage.commitSession(loginSession),
    },
  });
}
