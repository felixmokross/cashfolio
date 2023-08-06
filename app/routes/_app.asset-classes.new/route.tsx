import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms/input";
import { createAssetClass } from "~/asset-classes/functions.server";
import { getTitle } from "~/utils";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  let name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  name = name.trim();

  await createAssetClass(userId, { name });

  return redirect("/asset-classes");
}

export const meta: V2_MetaFunction = () => [
  { title: getTitle("New Asset Class") },
];

export default function NewAssetClassPage() {
  return (
    <Form method="post">
      <Input name="name" label="Name" />
      <Button type="submit">Create</Button>
    </Form>
  );
}
