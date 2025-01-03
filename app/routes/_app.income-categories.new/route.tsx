import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { createIncomeCategory } from "~/income-categories/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function action({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  await createIncomeCategory(userId, { name });

  return redirect("/income-categories");
}

export const meta: MetaFunction = () => [
  { title: getTitle("New Income Category") },
];

export default function NewIncomeCategoryPage() {
  return <Page />;
}
