import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import type { FormActionData } from "~/common/forms/types";
import type { AccountValues } from "~/accounts/functions.server";
import {
  createAccount,
  getAccountValues,
  validateAccountValues,
} from "~/accounts/functions.server";
import { getAssetClasses } from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";
import { hasErrors } from "~/common/utils.server";
import { Page } from "./page";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const values = await getAccountValues(request);
  const errors = await validateAccountValues(userId, undefined, values);

  if (hasErrors(errors)) {
    return json<FormActionData<AccountValues>>(
      { ok: false, errors, values },
      { status: 400 }
    );
  }

  await createAccount(userId, values);

  return redirect("/accounts");
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  const assetClasses = await getAssetClasses(userId);

  return json({ assetClasses });
}

export const meta: MetaFunction = () => [{ title: getTitle("New Account") }];

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
