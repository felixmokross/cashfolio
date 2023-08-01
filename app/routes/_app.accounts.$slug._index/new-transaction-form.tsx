import { PlusIcon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import { BookingType } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "~/components/button";
import { Combobox } from "~/components/forms/combobox";
import { DateInput } from "~/components/forms/date-input";
import { FormattedNumberInput } from "~/components/forms/formatted-number-input";
import { Input } from "~/components/forms/input";
import { RadioGroup } from "~/components/forms/radio-group";

export type NewTransactionFormProps = {
  targetAccounts: SerializeFrom<Account>[];
};

export function NewTransactionForm({
  targetAccounts,
}: NewTransactionFormProps) {
  return (
    <Form className="mt-8 rounded-md border border-slate-300 shadow-sm">
      <h3 className="border-b border-slate-300 py-2 text-center text-sm font-medium text-slate-500">
        New Transaction
      </h3>
      <div className="border-b border-slate-300">
        <RadioGroup
          size="compact"
          options={[
            { label: "Transfer", value: BookingType.TRANSFER },
            { label: "Balance Change", value: BookingType.BALANCE_CHANGE },
            { label: "Value Change", value: BookingType.VALUE_CHANGE },
          ]}
        />
      </div>
      <div className="flex gap-px border-b border-slate-300">
        <DateInput size="compact" groupClassName="w-40" />
        <Combobox
          placeholder="To/From Account"
          groupClassName="flex-grow"
          options={targetAccounts.map((a) => ({
            primaryText: a.name,
            value: a.id,
          }))}
          size="compact"
        />
        <FormattedNumberInput
          groupClassName="w-24"
          placeholder="Amount"
          size="compact"
        />
      </div>
      <div className="flex gap-px">
        <Input
          placeholder="Note (optional)"
          size="compact"
          groupClassName="flex-grow"
          className="rounded-bl-md"
        />
        <Button
          size="compact"
          type="submit"
          variant="primary"
          className="rounded-br-md"
          icon={PlusIcon}
        >
          Create
        </Button>
      </div>
    </Form>
  );
}
