import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { Link, redirect } from "react-router";
import { getSession } from "~/common/session.server";
import { getTitle } from "~/common/utils";

export async function loader({ request }: LoaderFunctionArgs) {
  // do not show this page if we are logged in
  const session = await getSession(request);
  const userId = session.get("userId");
  if (userId) return redirect("/");

  return null;
}

export const meta: MetaFunction = () => [{ title: getTitle("Logged Out") }];

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
