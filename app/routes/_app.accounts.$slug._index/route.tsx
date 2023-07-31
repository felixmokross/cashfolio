import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { getAccount } from "~/models/accounts.server";
import { AccountPage } from "./account-page";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const account = await getAccount(params.slug, userId);
  if (!account) throw new Response("Not found", { status: 404 });

  return json({ account });
}

export default function Route() {
  const { account } = useLoaderData<typeof loader>();
  return <AccountPage account={account} />;
}
