import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Page } from "./page";
import { getAccount, getAccounts } from "~/accounts/functions.server";
import { requireUserId } from "~/common/auth.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import { getBalanceChangeCategories } from "~/balance-change-categories/functions.server";
import invariant from "tiny-invariant";
import type { TransactionValues } from "~/transactions/functions.server";
import {
  createTransaction,
  getTransactionValues,
  validateTransactionValues,
} from "~/transactions/functions.server";
import { hasErrors } from "~/common/utils.server";
import type { FormActionData } from "~/common/forms/types";

export async function loader({ request }: LoaderFunctionArgs) {
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

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);

  const accountSlug = new URL(request.url).searchParams.get("account");
  invariant(typeof accountSlug === "string", "No account provided");

  const account = await getAccount(accountSlug, userId);
  invariant(!!account, "Account not found");

  const values = await getTransactionValues(request);
  const errors = await validateTransactionValues(values);

  if (hasErrors(errors)) {
    return json<FormActionData<TransactionValues>>(
      { ok: false, errors, values },
      { status: 400 },
    );
  }

  await createTransaction(values, account.id, userId);

  return redirect(`/accounts/${account.slug}`);
}

export default function Route() {
  const { account, accounts, balanceChangeCategories } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <Page
      account={account}
      accounts={accounts}
      balanceChangeCategories={balanceChangeCategories}
      values={actionData?.values}
      errors={actionData?.errors}
    />
  );
}
