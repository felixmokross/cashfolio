import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import {
  getAccount,
  getAccountId,
  updateAccount,
} from "~/models/accounts.server";
import { getTitle } from "~/utils";

export async function action({ params, request }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");

  const userId = await requireUserId(request);
  const accountId = await getAccountId(params.slug, userId);
  if (!accountId) throw new Response("Not found", { status: 404 });

  const form = await request.formData();
  const name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  await updateAccount(accountId, userId, { name });

  return redirect("/accounts");
}

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const userId = await requireUserId(request);

  const account = await getAccount(params.slug, userId);
  if (!account) throw new Response("Not found", { status: 404 });

  return json(account);
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(data.name) },
];

export default function EditAccountPage() {
  const account = useLoaderData<typeof loader>();
  return (
    <Form method="post">
      <Input name="name" label="Name" defaultValue={account.name} />
      <Button type="submit">Update</Button>
    </Form>
  );
}
