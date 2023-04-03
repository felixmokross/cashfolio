import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { TokenSet } from "openid-client";
import { requireUserId } from "~/auth.server";
import { getSession } from "~/session.server";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  const session = await getSession(request);
  const claims = new TokenSet({ id_token: session.get("idToken") }).claims();
  const user = { id: userId, email: claims.email, pictureUrl: claims.picture };

  return json(user);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
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
