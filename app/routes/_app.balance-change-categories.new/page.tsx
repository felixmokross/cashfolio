import { PlusIcon } from "@heroicons/react/24/outline";
import { BalanceChangeType } from "@prisma/client";
import { Form } from "@remix-run/react";
import { Button } from "~/common/base/buttons/button";
import { Input } from "~/common/base/forms/input";
import { RadioGroup } from "~/common/base/forms/radio-group";
import { FormPageHeader } from "~/common/form-page-header";

export function Page() {
  return (
    <div className="flex justify-center">
      <Form method="post" className="max-w-lg space-y-8 w-full px-4 py-8">
        <FormPageHeader icon={PlusIcon} variant="positive">
          New Balance Change Category
        </FormPageHeader>

        <div className="grid grid-cols-6 gap-x-4 gap-y-8">
          <Input name="name" label="Name" groupClassName="col-span-6" />
          <RadioGroup
            name="type"
            label="Type"
            groupClassName="col-span-6"
            options={[
              {
                value: BalanceChangeType.INCOME,
                label: "Income",
                variant: "positive",
              },
              {
                value: BalanceChangeType.EXPENSE,
                label: "Expense",
                variant: "negative",
              },
            ]}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
