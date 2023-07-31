import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import type { FormActionData } from "~/components/forms/types";
import type { AccountValues } from "~/models/accounts.server";
import {
  getAccount,
  getAccountId,
  getAccountValues,
  updateAccount,
  validateAccountValues,
} from "~/models/accounts.server";
import { getAssetClasses } from "~/models/asset-classes.server";
import { getTitle } from "~/utils";
import { hasErrors } from "~/utils.server";
import { EditAccountPage } from "./edit-account-page";

export async function action({ params, request }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");

  const userId = await requireUserId(request);
  const accountId = await getAccountId(params.slug, userId);
  if (!accountId) throw new Response("Not found", { status: 404 });

  const values = await getAccountValues(request);
  const errors = await validateAccountValues(userId, accountId, values);
  if (hasErrors(errors)) {
    return json<FormActionData<AccountValues>>(
      { ok: false, errors, values },
      { status: 400 }
    );
  }

  await updateAccount(accountId, userId, values);

  return redirect("/accounts");
}

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const [account, assetClasses] = await Promise.all([
    getAccount(params.slug, userId),
    getAssetClasses(userId),
  ]);

  if (!account) throw new Response("Not found", { status: 404 });

  return json({ assetClasses, account });
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(data!.account.name) },
];

export default function Route() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <EditAccountPage
      data={loaderData}
      errors={actionData?.errors}
      values={actionData?.values}
    />
  );
}
