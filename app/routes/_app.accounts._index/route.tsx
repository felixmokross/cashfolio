import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { getAccounts } from "~/models/accounts.server";
import { getTitle } from "~/utils";
import { AccountListPage } from "./account-list-page";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({ accounts: await getAccounts(userId) });
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("Accounts") }];

export default function Route() {
  const { accounts } = useLoaderData<typeof loader>();
  return <AccountListPage accounts={accounts} />;
}
