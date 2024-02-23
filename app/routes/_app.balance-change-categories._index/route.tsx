import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { getBalanceChangeCategories } from "~/balance-change-categories/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function loader({ request }: LoaderFunctionArgs) {
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
  return <Page balanceChangeCategories={balanceChangeCategories} />;
}
