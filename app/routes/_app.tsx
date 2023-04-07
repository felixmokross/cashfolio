import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/auth.server";
import { LocaleProvider } from "~/components/locale-context";

export async function loader({ request }: DataFunctionArgs) {
  const user = await requireUser(request);
  return json(user);
}

export default function App() {
  const user = useLoaderData<typeof loader>();
  return (
    <LocaleProvider locale={user.preferredLocale}>
      <p>
        <Link to=".">Home</Link> | <Link to="accounts">Accounts</Link> |{" "}
        <Link to="asset-classes">Asset Classes</Link> | User: {user.email}
        <img className="h-10 w-10" src={user.pictureUrl} alt="" /> |{" "}
        <Link to="logout">Log Out</Link>
      </p>
      <Outlet />
    </LocaleProvider>
  );
}
