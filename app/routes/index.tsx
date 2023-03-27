import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth.server";

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({ user });
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p>
        User: {user.email}
        <img className="h-10 w-10" src={user.pictureUrl} alt="" />
      </p>

      <p>
        <Link to="logout">&rarr; Log Out</Link>
      </p>
    </>
  );
}
