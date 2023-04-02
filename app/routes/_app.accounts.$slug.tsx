import type {
  DataFunctionArgs,
  MetaFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import slugify from "slugify";
import invariant from "tiny-invariant";
import { getUser } from "~/auth.server";
import { Button } from "~/components/button";
import { Input } from "~/components/forms";
import { prisma } from "~/prisma.server";
import { getTitle } from "~/utils";

export async function action({ params, request }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const user = await getUser(request);

  const account = await prisma.account.findUnique({
    where: { slug_userId: { slug: params.slug, userId: user.id } },
  });
  if (!account) throw new Response("Not found", { status: 404 });

  const form = await request.formData();
  let name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  name = name.trim();

  await prisma.account.update({
    where: { id_userId: { userId: user.id, id: account.id } },
    data: {
      name,
      slug: slugify(name, { lower: true }),
    },
  });

  return redirect("/accounts");
}

export async function loader({ request, params }: DataFunctionArgs) {
  invariant(params.slug, "slug is required");
  const user = await getUser(request);

  const account = await prisma.account.findUnique({
    where: { slug_userId: { slug: params.slug, userId: user.id } },
  });

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
