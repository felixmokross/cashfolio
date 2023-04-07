import { PlusIcon } from "@heroicons/react/24/outline";
import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";
import type { FormActionData } from "~/components/forms";
import type { AccountValues } from "~/models/accounts.server";
import {
  createAccount,
  getAccountValues,
  validateAccountValues,
} from "~/models/accounts.server";
import { getAssetClasses } from "~/models/asset-classes.server";
import { getTitle } from "~/utils";
import { hasErrors } from "~/utils.server";

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

export default function NewAccountPage() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 p-4">
        <div className="col-span-6 flex flex-col items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
            <PlusIcon className="h-6 w-6 text-emerald-600" />
          </span>
          <h2 className="text-lg font-medium text-slate-800">New Account</h2>
        </div>

        <AccountFormFields
          data={loaderData}
          errors={actionData?.errors}
          values={actionData?.values}
          disabled={false}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
