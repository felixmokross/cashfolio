import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { getAssetClasses } from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  return {
    assetClasses: await getAssetClasses(userId),
  };
}

export const meta: MetaFunction = () => [{ title: getTitle("Asset Classes") }];

export default function Route() {
  const { assetClasses } = useLoaderData<typeof loader>();
  return <Page assetClasses={assetClasses} />;
}
