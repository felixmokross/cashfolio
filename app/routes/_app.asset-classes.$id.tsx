import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import {
  assetClassExists,
  getAssetClass,
  updateAssetClass,
} from "~/models/asset-classes.server";
import { getTitle } from "~/utils";

export async function action({ params, request }: DataFunctionArgs) {
  invariant(params.id, "id is required");
  const userId = await requireUserId(request);

  if (!(await assetClassExists(params.id, userId))) {
    throw new Response("Not found", { status: 404 });
  }

  const form = await request.formData();
  let name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  name = name.trim();

  await updateAssetClass(params.id, userId, { name });

  return redirect("/asset-classes");
}

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.id, "id is required");
  const userId = await requireUserId(request);

  const assetClass = await getAssetClass(params.id, userId);
  if (!assetClass) throw new Response("Not found", { status: 404 });

  return json(assetClass);
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
