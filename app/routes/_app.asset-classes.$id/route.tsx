import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "react-router";
import { redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import {
  assetClassExists,
  getAssetClass,
  updateAssetClass,
} from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function action({ params, request }: ActionFunctionArgs) {
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.id, "id is required");
  const userId = await requireUserId(request);

  const assetClass = await getAssetClass(params.id, userId);
  if (!assetClass) throw new Response("Not found", { status: 404 });

  return assetClass;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => [
  { title: getTitle(data!.name) },
];

export default function EditAssetClassPage() {
  const assetClass = useLoaderData<typeof loader>();
  return <Page assetClass={assetClass} />;
}
