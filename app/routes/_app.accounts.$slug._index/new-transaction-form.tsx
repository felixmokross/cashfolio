import { PlusIcon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/button";
import { Combobox } from "~/components/forms/combobox";
import { DateInput } from "~/components/forms/date-input";
import { FormattedNumberInput } from "~/components/forms/formatted-number-input";
import { Input } from "~/components/forms/input";
import { RadioGroup } from "~/components/forms/radio-group";
import type {
  TransactionType,
  TransactionDirection,
} from "~/models/transactions.server";

export type NewTransactionFormProps = {
  accountId: SerializeFrom<Account>["id"];
  targetAccounts: SerializeFrom<Account>[];
};

const defaultTransactionType: TransactionType = "balanceChange";

export function NewTransactionForm({
  accountId,
  targetAccounts,
}: NewTransactionFormProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    defaultTransactionType
  );
  return (
    <Form
      method="post"
      className="mt-8 rounded-md border border-slate-300 shadow-sm"
    >
      <input type="hidden" name="accountId" value={accountId} />
      {/* <h3 className="border-b border-slate-300 py-2 text-center text-sm font-medium text-slate-500">
        New Transaction
      </h3> */}
      <div className="border-b border-slate-300">
        <RadioGroup<TransactionType>
          name="transactionType"
          size="compact"
          className="rounded-t-md"
          defaultValue={defaultTransactionType}
          options={[
            { label: "Transfer", value: "transfer" },
            { label: "Balance Change", value: "balanceChange" },
            { label: "Value Change", value: "valueChange" },
          ]}
          onChange={setTransactionType}
        />
      </div>
      <div className="flex gap-px border-b border-slate-300">
        <DateInput size="compact" groupClassName="w-40" name="date" />
        {transactionType === "transfer" && (
          <>
            <RadioGroup<TransactionDirection>
              name="transactionDirection"
              size="compact"
              defaultValue="decrease"
              groupClassName="w-48"
              options={[
                { label: "From", value: "increase", variant: "positive" },
                { label: "To", value: "decrease", variant: "negative" },
              ]}
            />
            <Combobox
              name="targetAccountId"
              placeholder="Account"
              groupClassName="flex-grow"
              options={targetAccounts.map((a) => ({
                primaryText: a.name,
                value: a.id,
              }))}
              size="compact"
            />
          </>
        )}
        {transactionType === "balanceChange" && (
          <>
            <RadioGroup<TransactionDirection>
              name="transactionDirection"
              size="compact"
              groupClassName="w-48"
              defaultValue="decrease"
              options={[
                { label: "Income", value: "increase", variant: "positive" },
                { label: "Expense", value: "decrease", variant: "negative" },
              ]}
            />
            <Combobox
              name="categoryId"
              placeholder="Category"
              groupClassName="flex-grow"
              options={[]}
              size="compact"
            />
          </>
        )}
        {transactionType === "valueChange" && (
          <RadioGroup<TransactionDirection>
            name="transactionDirection"
            size="compact"
            groupClassName="flex-grow"
            defaultValue="increase"
            options={[
              {
                label: "Appreciation",
                value: "increase",
                variant: "positive",
              },
              {
                label: "Depreciation",
                value: "decrease",
                variant: "negative",
              },
            ]}
          />
        )}
      </div>
      <div className="flex gap-px border-b border-slate-300">
        <Input
          name="note"
          placeholder="Note (optional)"
          size="compact"
          groupClassName="flex-grow"
          className="rounded-bl-md"
        />
        <FormattedNumberInput
          name="amount"
          groupClassName="w-28"
          placeholder="Amount"
          size="compact"
        />
      </div>
      <div className="flex">
        <Button
          size="compact"
          type="submit"
          variant="primary"
          className="flex-grow rounded-b-md"
          icon={PlusIcon}
        >
          Create Transaction
        </Button>
      </div>
    </Form>
  );
}
