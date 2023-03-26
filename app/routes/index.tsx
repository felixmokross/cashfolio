import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth.server";

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({ user: user.auth0UserId });
}

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
