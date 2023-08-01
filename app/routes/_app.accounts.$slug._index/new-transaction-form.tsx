import { PlusIcon } from "@heroicons/react/20/solid";
import type { Account } from "@prisma/client";
import { BookingType } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/button";
import { Combobox } from "~/components/forms/combobox";
import { DateInput } from "~/components/forms/date-input";
import { FormattedNumberInput } from "~/components/forms/formatted-number-input";
import { Input } from "~/components/forms/input";
import { RadioGroup } from "~/components/forms/radio-group";

export type NewTransactionFormProps = {
  accountId: SerializeFrom<Account>["id"];
  targetAccounts: SerializeFrom<Account>[];
};

const defaultBookingType = BookingType.BALANCE_CHANGE;

export function NewTransactionForm({
  accountId,
  targetAccounts,
}: NewTransactionFormProps) {
  const [bookingType, setBookingType] =
    useState<BookingType>(defaultBookingType);
  return (
    <Form
      method="post"
      className="mt-8 rounded-md border border-slate-300 shadow-sm"
    >
      <input type="hidden" name="accountId" value={accountId} />
      <h3 className="border-b border-slate-300 py-2 text-center text-sm font-medium text-slate-500">
        New Transaction
      </h3>
      <div className="border-b border-slate-300">
        <RadioGroup
          name="bookingType"
          size="compact"
          defaultValue={defaultBookingType}
          options={[
            { label: "Transfer", value: BookingType.TRANSFER },
            { label: "Balance Change", value: BookingType.BALANCE_CHANGE },
            { label: "Value Change", value: BookingType.VALUE_CHANGE },
          ]}
          onChange={setBookingType}
        />
      </div>
      <div className="flex gap-px border-b border-slate-300">
        <DateInput size="compact" groupClassName="w-40" name="date" />
        {bookingType === BookingType.TRANSFER && (
          <Combobox
            name="targetAccountId"
            placeholder="To/From Account"
            groupClassName="flex-grow"
            options={targetAccounts.map((a) => ({
              primaryText: a.name,
              value: a.id,
            }))}
            size="compact"
          />
        )}
        {bookingType === BookingType.BALANCE_CHANGE && (
          <Combobox
            name="categoryId"
            placeholder="Category"
            groupClassName="flex-grow"
            options={[]}
            size="compact"
          />
        )}
        {bookingType === BookingType.VALUE_CHANGE && (
          <div className="flex-grow" />
        )}
        <FormattedNumberInput
          name="amount"
          groupClassName="w-28"
          placeholder="Amount"
          size="compact"
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
        <div className="flex w-28">
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
