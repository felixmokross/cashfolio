import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { createAssetClass } from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  let name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  name = name.trim();

  await createAssetClass(userId, { name });

  return redirect("/asset-classes");
}

export const meta: MetaFunction = () => [
  { title: getTitle("New Asset Class") },
];

export default function Route() {
  return <Page />;
}
