import { PencilIcon } from "@heroicons/react/24/outline";
import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";
import type { FormActionData } from "~/components/forms";
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

export async function action({ params, request }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");

  const userId = await requireUserId(request);
  const accountId = await getAccountId(params.slug, userId);
  if (!accountId) throw new Response("Not found", { status: 404 });

  const values = await getAccountValues(request);
  const errors = validateAccountValues(values);
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

export const meta: V2_MetaFunction<typeof loader> = ({ data: { account } }) => [
  { title: getTitle(account.name) },
];

export default function EditAccountPage() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 p-4">
        <div className="col-span-6 flex flex-col items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <PencilIcon className="h-6 w-6 text-amber-600" />
          </span>
          <h2 className="text-lg font-medium text-gray-800">Edit Account</h2>
        </div>

        <AccountFormFields
          disabled={false}
          data={loaderData}
          values={actionData?.values}
          errors={actionData?.errors}
        />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
