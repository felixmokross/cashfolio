import { PlusIcon } from "@heroicons/react/24/outline";
import { BalanceChangeType } from "@prisma/client";
import { Input } from "~/common/base/forms/input";
import { RadioGroup } from "~/common/base/forms/radio-group";
import { FormPage } from "~/common/form-page";

export function Page() {
  return (
    <FormPage
      title="New Balance Change Category"
      icon={PlusIcon}
      variant="positive"
      submitButtonLabel="Create"
    >
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
    </FormPage>
  );
}
