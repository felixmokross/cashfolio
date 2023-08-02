import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/auth.server";
import { LinkButton } from "~/components/link-button";
import { getBalanceChangeCategories } from "~/models/balance-change-categories";
import { getTitle } from "~/utils";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({
    balanceChangeCategories: await getBalanceChangeCategories(userId),
  });
}

export const meta: V2_MetaFunction = () => [
  { title: getTitle("Balance Change Categories") },
];

export default function BalanceChangeCategoryListPage() {
  const { balanceChangeCategories } = useLoaderData<typeof loader>();
  return (
    <div className="h-screen bg-gray-50">
      <h2 className="mt-4 text-center text-lg font-medium text-gray-700">
        Balance Change Categories
      </h2>

      <LinkButton to="new">New Balance Change Category</LinkButton>

      <ul className="mt-4 space-y-4">
        {balanceChangeCategories.map((c) => (
          <li key={c.id}>
            <Link to={c.id}>
              {c.name} ({c.type})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}