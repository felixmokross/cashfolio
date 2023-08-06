import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { LinkButton } from "~/common/link-button";
import { getAssetClasses } from "~/asset-classes/functions.server";
import { getTitle } from "~/common/utils";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({
    assetClasses: await getAssetClasses(userId),
  });
}

export const meta: V2_MetaFunction = () => [
  { title: getTitle("Asset Classes") },
];

export default function AssetClassListPage() {
  const { assetClasses } = useLoaderData<typeof loader>();
  return (
    <div className="h-screen bg-gray-50">
      <h2 className="mt-4 text-center text-lg font-medium text-gray-700">
        Asset Classes
      </h2>

      <LinkButton to="new">New Asset Class</LinkButton>

      <ul className="mt-4 space-y-4">
        {assetClasses.map((a) => (
          <li key={a.id}>
            <Link to={a.id}>{a.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
