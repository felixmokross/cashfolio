import { PlusIcon } from "@heroicons/react/24/outline";
import { BalanceChangeType } from "@prisma/client";
import { useState } from "react";
import type { AccountDto } from "~/accounts/types";
import type { BalanceChangeCategoryDto } from "~/balance-change-categories/types";
import { Combobox } from "~/common/base/forms/combobox";
import { DateInput } from "~/common/base/forms/date-input";
import { FormattedNumberInput } from "~/common/base/forms/formatted-number-input";
import { Input } from "~/common/base/forms/input";
import { RadioGroup } from "~/common/base/forms/radio-group";
import type { FormErrors } from "~/common/forms/types";
import type {
  TransactionDirection,
  TransactionType,
  TransactionValues,
} from "~/transactions/functions.server";
import { useUser } from "~/common/user-context";
import { FormPage } from "~/common/form-page";

const defaultTransactionType: TransactionType = "balanceChange";

export type PageProps = {
  account: AccountDto;
  accounts: AccountDto[];
  balanceChangeCategories: BalanceChangeCategoryDto[];
  values?: TransactionValues;
  errors?: FormErrors<TransactionValues>;
};

export function Page({
  account,
  accounts,
  balanceChangeCategories,
  values,
  errors,
}: PageProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>(
    defaultTransactionType,
  );
  const defaultTransactionDirection: TransactionDirection =
    transactionType === "valueChange" ? "increase" : "decrease";
  const [transactionDirection, setTransactionDirection] =
    useState<TransactionDirection>(defaultTransactionDirection);

  const { preferredLocale } = useUser();

  const balanceChangeType =
    transactionDirection === "increase"
      ? BalanceChangeType.INCOME
      : BalanceChangeType.EXPENSE;
  return (
    <FormPage
      title="New Transaction"
      icon={PlusIcon}
      variant="positive"
      submitButtonLabel="Create"
    >
      <DateInput
        label="Date"
        groupClassName="col-span-2"
        name="date"
        defaultValue={values?.date}
        error={errors?.date}
      />
      <Combobox
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
        defaultValue={values?.type || defaultTransactionType}
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
            defaultValue={values?.direction || defaultTransactionDirection}
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
            defaultValue={values?.targetAccountId || undefined}
            options={accounts
              .filter((a) => a.id !== account.id)
              .map((a) => ({
                primaryText: a.name,
                value: a.id,
              }))}
            error={errors?.targetAccountId}
          />
        </>
      )}

      {transactionType === "balanceChange" && (
        <>
          <RadioGroup<TransactionDirection>
            name="transactionDirection"
            groupClassName="col-span-2"
            defaultValue={values?.direction || defaultTransactionDirection}
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
            defaultValue={values?.balanceChangeCategoryId || undefined}
            options={balanceChangeCategories
              .filter((c) => c.type === balanceChangeType)
              .map((c) => ({
                value: c.id,
                primaryText: c.name,
              }))}
            error={errors?.balanceChangeCategoryId}
          />
        </>
      )}

      {transactionType === "valueChange" && (
        <RadioGroup<TransactionDirection>
          name="transactionDirection"
          groupClassName="col-span-6"
          defaultValue={values?.direction || defaultTransactionDirection}
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
        defaultValue={values?.note}
        error={errors?.note}
        groupClassName="col-span-4"
      />
      <FormattedNumberInput
        name="amount"
        groupClassName="col-span-2"
        label="Amount"
        adornment={account.currency || undefined}
        defaultValue={values?.amount}
        error={errors?.amount}
        locale={preferredLocale}
      />
    </FormPage>
  );
}
