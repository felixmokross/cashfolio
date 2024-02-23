import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import type { FormActionData } from "~/common/forms/types";
import type { AccountValues } from "~/accounts/functions.server";
import {
  getAccount,
  getAccountId,
  getAccountValues,
  updateAccount,
  validateAccountValues,
} from "~/accounts/functions.server";
import { getAssetClasses } from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";
import { hasErrors } from "~/common/utils.server";
import { Page } from "./page";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.slug, "slug is required");

  const userId = await requireUserId(request);
  const accountId = await getAccountId(params.slug, userId);
  if (!accountId) throw new Response("Not found", { status: 404 });

  const values = await getAccountValues(request);
  const errors = await validateAccountValues(userId, accountId, values);
  if (hasErrors(errors)) {
    return json<FormActionData<AccountValues>>(
      { ok: false, errors, values },
      { status: 400 },
    );
  }

  const updatedAccount = await updateAccount(accountId, userId, values);

  return redirect(`/accounts/${updatedAccount.slug}`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const [account, assetClasses] = await Promise.all([
    getAccount(params.slug, userId),
    getAssetClasses(userId),
  ]);

  if (!account) throw new Response("Not found", { status: 404 });

  return json({ assetClasses, account });
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(`Edit ${data!.account.name}`) },
];

export default function Route() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <Page
      data={loaderData}
      errors={actionData?.errors}
      values={actionData?.values}
    />
  );
}
