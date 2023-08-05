import { json, type DataFunctionArgs, redirect } from "@remix-run/node";
import { Page } from "./page";
import { getAccount, getAccounts } from "~/models/accounts.server";
import { requireUserId } from "~/auth.server";
import { useLoaderData } from "@remix-run/react";
import { getBalanceChangeCategories } from "~/models/balance-change-categories";
import invariant from "tiny-invariant";
import { createTransaction } from "~/models/transactions.server";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const accountSlug = new URL(request.url).searchParams.get("account");
  invariant(typeof accountSlug === "string", "No account provided");

  const [account, accounts, balanceChangeCategories] = await Promise.all([
    getAccount(accountSlug, userId),
    getAccounts(userId),
    getBalanceChangeCategories(userId),
  ]);

  invariant(!!account, "Account not found");

  return json({ account, accounts, balanceChangeCategories });
}

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  const accountSlug = new URL(request.url).searchParams.get("account");
  invariant(typeof accountSlug === "string", "No account provided");

  const account = await getAccount(accountSlug, userId);
  invariant(!!account, "Account not found");

  const form = await request.formData();

  await createTransaction(form, userId);

  return redirect(`/accounts/${account.slug}`);
}

export default function Route() {
  const { account, accounts, balanceChangeCategories } =
    useLoaderData<typeof loader>();
  return (
    <Page
      account={account}
      accounts={accounts}
      balanceChangeCategories={balanceChangeCategories}
    />
  );
}
