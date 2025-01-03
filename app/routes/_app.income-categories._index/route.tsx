import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { useLoaderData } from "react-router";
import { requireUserId } from "~/common/auth.server";
import { getIncomeCategories } from "~/income-categories/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  return {
    incomeCategories: await getIncomeCategories(userId),
  };
}

export const meta: MetaFunction = () => [
  { title: getTitle("Income Categories") },
];

export default function IncomeCategoryListPage() {
  const { incomeCategories } = useLoaderData<typeof loader>();
  return <Page incomeCategories={incomeCategories} />;
}
