import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react/dist/routeModules";
import invariant from "tiny-invariant";
import { getUser } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { prisma } from "~/prisma.server";
import { getTitle } from "~/utils";

export async function action({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  const form = await request.formData();
  let name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  name = name.trim();

  await prisma.assetClass.create({
    data: {
      name,
      userId: user.id,
    },
  });

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
