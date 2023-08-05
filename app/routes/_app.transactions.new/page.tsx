import { PlusIcon } from "@heroicons/react/24/outline";
import { BalanceChangeType } from "@prisma/client";
import { Form } from "@remix-run/react";
import { useState } from "react";
import type { AccountDto } from "~/accounts/types";
import type { BalanceChangeCategoryDto } from "~/balance-change-categories/types";
import { Button } from "~/components/button";
import { FormPageHeader } from "~/components/form-page-header";
import { Combobox } from "~/components/forms/combobox";
import { DateInput } from "~/components/forms/date-input";
import { FormattedNumberInput } from "~/components/forms/formatted-number-input";
import { Input } from "~/components/forms/input";
import { RadioGroup } from "~/components/forms/radio-group";
import type {
  TransactionDirection,
  TransactionType,
} from "~/models/transactions.server";

const defaultTransactionType: TransactionType = "balanceChange";

export type PageProps = {
  account: AccountDto;
  accounts: AccountDto[];
  balanceChangeCategories: BalanceChangeCategoryDto[];
};

export function Page({
  account,
  accounts,
  balanceChangeCategories,
}: PageProps) {
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
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 px-4 py-8">
        <FormPageHeader icon={PlusIcon} variant="positive">
          New Transaction
        </FormPageHeader>
        <div className="grid grid-cols-6 gap-x-4 gap-y-8">
          <DateInput label="Date" groupClassName="col-span-2" name="date" />
          <Combobox
            name="accountId"
            label="Account"
            groupClassName="col-span-4"
            defaultValue={account.id}
            disabled={true}
            options={[account].map((a) => ({
              primaryText: a.name,
              value: a.id,
            }))}
          />
          <RadioGroup<TransactionType>
            name="transactionType"
            groupClassName="col-start-1 col-span-6"
            defaultValue={defaultTransactionType}
            options={[
              { label: "Transfer", value: "transfer" },
              { label: "Balance Change", value: "balanceChange" },
              { label: "Value Change", value: "valueChange" },
            ]}
            onChange={setTransactionType}
          />
          {transactionType === "transfer" && (
            <>
              <RadioGroup<TransactionDirection>
                name="transactionDirection"
                defaultValue={defaultTransactionDirection}
                onChange={setTransactionDirection}
                groupClassName="col-span-2"
                options={[
                  { label: "From", value: "increase", variant: "positive" },
                  { label: "To", value: "decrease", variant: "negative" },
                ]}
              />
              <Combobox
                name="targetAccountId"
                placeholder="Account"
                groupClassName="col-span-4"
                options={accounts
                  .filter((a) => a.id !== account.id)
                  .map((a) => ({
                    primaryText: a.name,
                    value: a.id,
                  }))}
              />
            </>
          )}

          {transactionType === "balanceChange" && (
            <>
              <RadioGroup<TransactionDirection>
                name="transactionDirection"
                groupClassName="col-span-2"
                defaultValue={defaultTransactionDirection}
                onChange={setTransactionDirection}
                options={[
                  { label: "Inc.", value: "increase", variant: "positive" },
                  { label: "Exp.", value: "decrease", variant: "negative" },
                ]}
              />
              <Combobox
                key={transactionDirection}
                name="balanceChangeCategoryId"
                placeholder="Category"
                groupClassName="col-span-4"
                options={balanceChangeCategories
                  .filter((c) => c.type === balanceChangeType)
                  .map((c) => ({
                    value: c.id,
                    primaryText: c.name,
                  }))}
              />
            </>
          )}

          {transactionType === "valueChange" && (
            <RadioGroup<TransactionDirection>
              name="transactionDirection"
              groupClassName="col-span-6"
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

          <Input
            name="note"
            label="Note (optional)"
            groupClassName="col-span-4"
          />
          <FormattedNumberInput
            name="amount"
            groupClassName="col-span-2"
            label="Amount"
            adornment={account.currency || undefined}
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
