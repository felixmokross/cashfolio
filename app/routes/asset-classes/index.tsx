import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth.server";
import { Button } from "~/components/button";
import { prisma } from "~/prisma.server";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  const user = await getUser(request);
  return json({
    assetClasses: await prisma.assetClass.findMany({
      where: { userId: user.id },
    }),
  });
}

export const meta: MetaFunction = () => ({ title: getTitle("Asset Classes") });

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
