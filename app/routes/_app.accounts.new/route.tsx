import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import type { FormActionData } from "~/components/forms/types";
import type { AccountValues } from "~/accounts/functions.server";
import {
  createAccount,
  getAccountValues,
  validateAccountValues,
} from "~/accounts/functions.server";
import { getAssetClasses } from "~/models/asset-classes.server";
import { getTitle } from "~/utils";
import { hasErrors } from "~/utils.server";
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

export const meta: V2_MetaFunction = () => [{ title: getTitle("New Account") }];

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
