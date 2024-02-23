import { BalanceChangeType } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { createBalanceChangeCategory } from "~/balance-change-categories/functions.server";
import { getTitle } from "~/common/utils";
import { Page } from "./page";

export async function action({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  const type = form.get("type");

  invariant(typeof name === "string", "name must be a string!");
  invariant(
    typeof type === "string" && isBalanceChangeType(type),
    "type must be a valid BalanceChangeType!",
  );

  await createBalanceChangeCategory(userId, { name, type });

  return redirect("/balance-change-categories");
}

function isBalanceChangeType(type: string): type is BalanceChangeType {
  return [BalanceChangeType.INCOME, BalanceChangeType.EXPENSE].includes(
    type as BalanceChangeType,
  );
}

export const meta: MetaFunction = () => [
  { title: getTitle("New Balance Change Category") },
];

export default function NewBalanceChangeCategoryPage() {
  return <Page />;
}
