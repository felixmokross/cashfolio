import { BalanceChangeType } from "@prisma/client";
import type { DataFunctionArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/common/auth.server";
import { Button } from "~/common/buttons/button";
import { Input } from "~/common/forms/input";
import { RadioGroup } from "~/common/forms/radio-group";
import { createBalanceChangeCategory } from "~/balance-change-categories/functions.server";
import { getTitle } from "~/common/utils";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  const type = form.get("type");

  invariant(typeof name === "string", "name must be a string!");
  invariant(
    typeof type === "string" && isBalanceChangeType(type),
    "type must be a valid BalanceChangeType!"
  );

  await createBalanceChangeCategory(userId, { name, type });

  return redirect("/balance-change-categories");
}

function isBalanceChangeType(type: string): type is BalanceChangeType {
  return [BalanceChangeType.INCOME, BalanceChangeType.EXPENSE].includes(
    type as BalanceChangeType
  );
}

export const meta: V2_MetaFunction = () => [
  { title: getTitle("New Balance Change Category") },
];

export default function NewBalanceChangeCategoryPage() {
  return (
    <Form method="post">
      <Input name="name" label="Name" />
      <RadioGroup
        name="type"
        label="Type"
        options={[
          { value: BalanceChangeType.INCOME, label: "Income" },
          { value: BalanceChangeType.EXPENSE, label: "Expense" },
        ]}
      />
      <Button type="submit">Create</Button>
    </Form>
  );
}
