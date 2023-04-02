import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth.server";

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({ user });
}

export default function App() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div>
      <p>
        <Link to=".">Home</Link> | <Link to="accounts">Accounts</Link> |{" "}
        <Link to="asset-classes">Asset Classes</Link> | User: {user.email}
        <img className="h-10 w-10" src={user.pictureUrl} alt="" /> |{" "}
        <Link to="logout">Log Out</Link>
      </p>
      <Outlet />
    </div>
  );
}
