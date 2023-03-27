import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirect } from "react-router";
import { getSession } from "~/session.server";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  // do not show this page if we are signed in
  const session = await getSession(request);
  const userId = session.get("userId");
  if (userId) return redirect("/");

  return null;
}

export const meta: MetaFunction = () => ({ title: getTitle("Signed Out") });

export default function SignedOut() {
  return (
    <>
      <h1>Signed out</h1>

      <p>
        <Link to="../signin">&rarr; Sign in</Link>
      </p>
      <p>
        <Link to="../signup">&rarr; Sign up</Link>
      </p>
    </>
  );
}
