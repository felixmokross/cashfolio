import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
} from "react-router";
import { Page } from "./page";
import { getAccount, getAccounts } from "~/accounts/functions.server";
import { requireUserId } from "~/common/auth.server";
// import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
// import { hasErrors } from "~/common/utils.server";
// import type { FormActionData } from "~/common/forms/types";
import { getIncomeCategories } from "~/income-categories/functions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const accountSlug = new URL(request.url).searchParams.get("account");
  invariant(typeof accountSlug === "string", "No account provided");

  const [account, accounts, incomeCategories] = await Promise.all([
    getAccount(accountSlug, userId),
    getAccounts(userId),
    getIncomeCategories(userId),
  ]);

  invariant(!!account, "Account not found");

  return { account, accounts, incomeCategories };
}

export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);

  const accountSlug = new URL(request.url).searchParams.get("account");
  invariant(typeof accountSlug === "string", "No account provided");

  const account = await getAccount(accountSlug, userId);
  invariant(!!account, "Account not found");

  // const values = await getTransactionValues(request);
  // const errors = await validateTransactionValues(values);

  // if (hasErrors(errors)) {
  //   return json<FormActionData<TransactionValues>>(
  //     { ok: false, errors, values },
  //     { status: 400 },
  //   );
  // }

  // await createTransaction(values, account.id, userId);

  return redirect(`/accounts/${account.slug}`);
}

export default function Route() {
  // const { account, accounts, incomeCategories } =
  //   useLoaderData<typeof loader>();
  // const actionData = useActionData<typeof action>();
  return (
    <Page
    // account={account}
    // accounts={accounts}
    // incomeCategories={incomeCategories}
    // values={actionData?.values}
    // errors={actionData?.errors}
    />
  );
}
