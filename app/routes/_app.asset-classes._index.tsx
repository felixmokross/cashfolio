import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { getAssetClasses } from "~/models/asset-classes.server";
import { getTitle } from "~/utils";

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
    <div className="h-screen bg-slate-50">
      <h2 className="mt-4 text-center text-lg font-medium text-slate-700">
        Asset Classes
      </h2>

      <Button as={Link} to="new">
        New Asset Class
      </Button>

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
