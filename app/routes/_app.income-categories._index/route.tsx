import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUserId } from "~/common/auth.server";
import { getIncomeCategories } from "~/income-categories/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  return json({
    incomeCategories: await getIncomeCategories(userId),
  });
}

export const meta: MetaFunction = () => [
  { title: getTitle("Income Categories") },
];

export default function IncomeCategoryListPage() {
  const { incomeCategories } = useLoaderData<typeof loader>();
  return <Page incomeCategories={incomeCategories} />;
}
