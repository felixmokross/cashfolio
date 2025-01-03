import type { LoaderFunctionArgs } from "react-router";
import { Outlet, useLoaderData } from "react-router";
import { requireUser } from "~/common/auth.server";
import { App } from "./app";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  return user;
}

export default function Route() {
  const user = useLoaderData<typeof loader>();
  return (
    <App user={user}>
      <Outlet />
    </App>
  );
}
