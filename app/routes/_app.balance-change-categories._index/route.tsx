import type { DataFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { LinkButton } from "~/common/buttons/link-button";
import { getBalanceChangeCategories } from "~/balance-change-categories/functions.server";
import { getTitle } from "~/common/utils";

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  return json({
    balanceChangeCategories: await getBalanceChangeCategories(userId),
  });
}

export const meta: MetaFunction = () => [
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
