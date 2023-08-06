import { PlusIcon } from "@heroicons/react/20/solid";
import {
  BalanceChangeType,
  type Account,
  type BalanceChangeCategory,
} from "@prisma/client";
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
} from "~/transactions/functions.server";

export type NewTransactionFormProps = {
  account: SerializeFrom<Account>;
  targetAccounts: SerializeFrom<Account>[];
  balanceChangeCategories: SerializeFrom<BalanceChangeCategory>[];
};

const defaultTransactionType: TransactionType = "balanceChange";

export function NewTransactionForm({
  account,
  targetAccounts,
  balanceChangeCategories,
}: NewTransactionFormProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    defaultTransactionType
  );
  const defaultTransactionDirection: TransactionDirection =
    transactionType === "valueChange" ? "increase" : "decrease";
  const [transactionDirection, setTransactionDirection] =
    useState<TransactionDirection>(defaultTransactionDirection);

  const balanceChangeType =
    transactionDirection === "increase"
      ? BalanceChangeType.INCOME
      : BalanceChangeType.EXPENSE;
  return (
    <Form
      method="post"
      className="mt-8 rounded-md border border-gray-300 shadow-sm"
    >
      <input type="hidden" name="accountId" value={account.id} />
      <h3 className="border-b border-gray-300 py-2 text-center text-sm font-medium text-gray-500">
        New Transaction
      </h3>
      <div className="flex gap-px border-b border-gray-300">
        <DateInput size="compact" groupClassName="w-40" name="date" />
        <RadioGroup<TransactionType>
          name="transactionType"
          size="compact"
          groupClassName="flex-grow"
          defaultValue={defaultTransactionType}
          options={[
            { label: "Transfer", value: "transfer" },
            { label: "Balance Change", value: "balanceChange" },
            { label: "Value Change", value: "valueChange" },
          ]}
          onChange={setTransactionType}
        />
      </div>
      <div className="flex gap-px border-b border-gray-300">
        {transactionType === "transfer" && (
          <>
            <RadioGroup<TransactionDirection>
              name="transactionDirection"
              size="compact"
              defaultValue={defaultTransactionDirection}
              onChange={setTransactionDirection}
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
              defaultValue={defaultTransactionDirection}
              onChange={setTransactionDirection}
              options={[
                { label: "Income", value: "increase", variant: "positive" },
                { label: "Expense", value: "decrease", variant: "negative" },
              ]}
            />
            <Combobox
              key={transactionDirection}
              name="balanceChangeCategoryId"
              placeholder="Category"
              groupClassName="flex-grow"
              options={balanceChangeCategories
                .filter((c) => c.type === balanceChangeType)
                .map((c) => ({
                  value: c.id,
                  primaryText: c.name,
                }))}
              size="compact"
            />
          </>
        )}
        {transactionType === "valueChange" && (
          <RadioGroup<TransactionDirection>
            name="transactionDirection"
            size="compact"
            groupClassName="flex-grow"
            defaultValue={defaultTransactionDirection}
            onChange={setTransactionDirection}
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
        <FormattedNumberInput
          name="amount"
          groupClassName="w-36"
          placeholder="Amount"
          size="compact"
          adornment={account.currency || undefined}
        />
      </div>
      <div className="flex gap-px">
        <Input
          name="note"
          placeholder="Note (optional)"
          size="compact"
          groupClassName="flex-grow"
          className="rounded-bl-md"
        />
        <div className="flex w-36">
          <Button
            size="compact"
            type="submit"
            variant="primary"
            className="flex-grow rounded-br-md"
            icon={PlusIcon}
          >
            Create
          </Button>
        </div>
      </div>
    </Form>
  );
}
