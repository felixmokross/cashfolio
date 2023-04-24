import type { getAssetClasses } from "~/models/asset-classes.server";
import { AccountType, AccountUnit } from "@prisma/client";
import type { AccountValues, getAccount } from "~/models/accounts.server";
import { useState } from "react";
// import { DatePicker } from "./date-picker/date-picker";
import type { FormProps } from "./forms/types";
import { RadioGroup } from "./forms/radio-group";
import { Input } from "./forms/input";
import { Select } from "./forms/select";
import { FormattedNumberInput } from "./forms/formatted-number-input";
import { DetailedRadioGroup } from "./forms/detailed-radio-group";
import { CurrencyCombobox } from "./forms/currency-combobox";

export type AccountFormLoaderData = {
  assetClasses: Awaited<ReturnType<typeof getAssetClasses>>;
  account?: NonNullable<Awaited<ReturnType<typeof getAccount>>>;
};

export type AccountFormProps = FormProps<AccountValues, AccountFormLoaderData>;

export function AccountFormFields({
  data: { account, assetClasses },
  values,
  errors,
}: AccountFormProps) {
  const [type, setType] = useState(account?.type || AccountType.ASSET);
  const [unit, setUnit] = useState(account?.unit || AccountUnit.CURRENCY);
  const [currency, setCurrency] = useState(account?.currency || undefined);
  const [preExisting, setPreExisting] = useState(account?.preExisting || false);
  return (
    <div className="grid grid-cols-6 gap-x-4 gap-y-8">
      <Input
        name="name"
        label="Name"
        groupClassName="col-start-1 col-span-3"
        defaultValue={values?.name || account?.name}
        error={errors?.name}
      />
      <RadioGroup
        name="type"
        label="Type"
        options={[
          { label: "Asset", value: AccountType.ASSET },
          { label: "Liability", value: AccountType.LIABILITY },
        ]}
        defaultValue={values?.type || account?.type || AccountType.ASSET}
        error={errors?.type}
        onChange={setType}
        groupClassName="col-start-1 col-span-3"
      />
      {type === AccountType.ASSET && (
        <Select
          name="assetClassId"
          label="Asset Class"
          defaultValue={
            values?.assetClassId || account?.assetClassId || undefined
          }
          error={errors?.assetClassId}
          groupClassName="col-span-3"
        >
          <option />
          {assetClasses.map((ac) => (
            <option key={ac.id} value={ac.id}>
              {ac.name}
            </option>
          ))}
        </Select>
      )}
      <RadioGroup
        name="unit"
        label="Unit"
        options={[
          { label: "Currency", value: AccountUnit.CURRENCY },
          { label: "Stock", value: AccountUnit.STOCK },
        ]}
        defaultValue={values?.unit || account?.unit || AccountUnit.CURRENCY}
        onChange={setUnit}
        error={errors?.unit}
        groupClassName="col-start-1 col-span-3"
      />
      {unit === AccountUnit.CURRENCY && (
        <CurrencyCombobox
          name="currency"
          label="Currency"
          defaultValue={values?.currency || account?.currency || undefined}
          error={errors?.currency}
          onChange={(v) => setCurrency(v as string)}
          groupClassName="col-span-3"
        />
      )}
      <DetailedRadioGroup
        label="When was the account opened?"
        name="preExisting"
        defaultValue={
          values?.preExisting || (account?.preExisting ? "on" : "off")
        }
        onChange={(value) => setPreExisting(value === "on")}
        error={errors?.preExisting}
        options={[
          {
            label: "Before Accounting Start",
            value: "on",
            description:
              "This is a pre-existing account. It has a balance on the day before the accounting start date.",
          },
          {
            label: "After Accounting Start",
            value: "off",
            description:
              "The account was opened on or after the accounting start date.",
          },
        ]}
        groupClassName="col-start-1 col-span-6"
      />
      {preExisting ? (
        <FormattedNumberInput
          key="balanceAtStart"
          groupClassName="col-start-1 col-span-3"
          label="Balance at Start"
          name="balanceAtStart"
          defaultValue={
            values?.balanceAtStart || account?.balanceAtStart || undefined
          }
          adornment={currency}
          error={errors?.balanceAtStart}
        />
      ) : (
        <Input
          key="openingDate"
          groupClassName="col-start-1 col-span-3"
          label="Opening Date"
          name="openingDate"
          type="date"
          defaultValue={
            values?.openingDate ||
            account?.openingDate?.split("T")[0] ||
            undefined
          }
          error={errors?.openingDate}
        />
      )}
      {/* <div className="col-span-3 col-start-1">
        <DatePicker label="Date" />
      </div> */}
    </div>
  );
}
