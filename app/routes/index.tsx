import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const user = session.get("userId");
  if (!user) return redirect("/signin");

  return json({ user });
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>User: {user}</p>

      <p>
        <Link to="signup">&rarr; Sign up</Link>
      </p>
      <p>
        <Link to="signin">&rarr; Sign in</Link>
      </p>
      <p>
        <Link to="signout">&rarr; Sign out</Link>
      </p>
    </>
  );
}
