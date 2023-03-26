import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import {
  getSigninSession,
  signinSessionStorage,
} from "./signin-session.server";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

const USER_SESSION_KEY = "userId";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function createUserSession({
  request,
  userId,
  idToken,
  redirectTo,
}: {
  request: Request;
  userId: string;
  idToken: string;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  session.set("idToken", idToken);
  return redirect(redirectTo, {
    headers: [
      [
        "Set-Cookie",
        await sessionStorage.commitSession(session, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
        }),
      ],
      [
        "Set-Cookie",
        await signinSessionStorage.destroySession(
          await getSigninSession(request)
        ),
      ],
    ],
  });
}
