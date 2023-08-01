import type { DataFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { getAccount, getAccounts } from "~/models/accounts.server";
import { AccountPage } from "./account-page";
import { useLoaderData } from "@remix-run/react";
import { getReverseLedgerDateGroups } from "~/models/ledger-lines.server";

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const [account, targetAccounts] = await Promise.all([
    getAccount(params.slug, userId),
    getAccounts(userId).then((accounts) =>
      accounts.filter((a) => a.slug !== params.slug)
    ),
  ]);
  if (!account) throw new Response("Not found", { status: 404 });

  const ledgerDateGroups = await getReverseLedgerDateGroups({
    account,
    page: 0, // TODO support pagination
    userId,
  });

  return json({ account, targetAccounts, ledgerDateGroups });
}

export default function Route() {
  const { account, ledgerDateGroups, targetAccounts } =
    useLoaderData<typeof loader>();
  return (
    <AccountPage
      account={account}
      ledgerDateGroups={ledgerDateGroups}
      targetAccounts={targetAccounts}
    />
  );
}
