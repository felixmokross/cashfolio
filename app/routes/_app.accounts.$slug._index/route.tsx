import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { getAccount, getAccounts } from "~/models/accounts.server";
import { Page } from "./page";
import { useLoaderData } from "@remix-run/react";
import { getReverseLedgerDateGroups } from "~/models/ledger-lines.server";
import { createTransaction } from "~/models/transactions.server";
import { getBalanceChangeCategories } from "~/models/balance-change-categories";
import { getTitle } from "~/utils";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  const form = await request.formData();

  await createTransaction(form, userId);

  return redirect(".");
}

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const [account, targetAccounts, balanceChangeCategories] = await Promise.all([
    getAccount(params.slug, userId),
    getAccounts(userId).then((accounts) =>
      accounts.filter((a) => a.slug !== params.slug)
    ),
    getBalanceChangeCategories(userId),
  ]);
  if (!account) throw new Response("Not found", { status: 404 });

  const ledgerDateGroups = await getReverseLedgerDateGroups({
    account,
    page: 0, // TODO support pagination
    userId,
  });

  return json({
    account,
    targetAccounts,
    ledgerDateGroups,
    balanceChangeCategories,
  });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(data!.account.name) },
];

export default function Route() {
  const { account, ledgerDateGroups, targetAccounts, balanceChangeCategories } =
    useLoaderData<typeof loader>();

  return (
    <>
      <Page
        account={account}
        ledgerDateGroups={ledgerDateGroups}
        targetAccounts={targetAccounts}
        balanceChangeCategories={balanceChangeCategories}
      />
    </>
  );
}
