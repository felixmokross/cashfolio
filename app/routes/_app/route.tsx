import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/auth.server";
import { App } from "./app";

export async function loader({ request }: DataFunctionArgs) {
  const user = await requireUser(request);
  return json(user);
}

export default function Route() {
  const user = useLoaderData<typeof loader>();
  return <App user={user} />;
}
