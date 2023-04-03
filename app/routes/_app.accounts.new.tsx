import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { createAccount } from "~/models/accounts.server";
import { getTitle } from "~/utils";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  await createAccount(userId, { name });

  return redirect("/accounts");
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("New Account") }];

export default function NewAccountPage() {
  return (
    <Form method="post">
      <Input name="name" label="Name" />
      <Button type="submit">Create</Button>
    </Form>
  );
}
