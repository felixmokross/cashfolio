import type {
  DataFunctionArgs,
  MetaFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { Link } from "@remix-run/react";
import { redirect } from "react-router";
import { getSession } from "~/session.server";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  // do not show this page if we are logged in
  const session = await getSession(request);
  const userId = session.get("userId");
  if (userId) return redirect("/");

  return null;
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("Logged Out") }];

export default function LoggedOut() {
  return (
    <>
      <h1>Logged Out</h1>

      <p>
        <Link to="../login">&rarr; Log In</Link>
      </p>
      <p>
        <Link to="../signup">&rarr; Sign Up</Link>
      </p>
    </>
  );
}
