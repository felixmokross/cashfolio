import { AccountType, AccountUnit } from "@prisma/client";
import { DataFunctionArgs, V2_MetaFunction, json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from "~/auth.server";
import { Button } from "~/components/button";
import { CurrencyCombobox, DetailedRadioGroup } from "~/components/forms";
import { Input, RadioGroup, Select } from "~/components/forms";
import { createAccount } from "~/models/accounts.server";
import { getAssetClasses } from "~/models/asset-classes.server";
import { getTitle } from "~/utils";

export async function action({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");

  invariant(typeof name === "string", "name must be a string!");

  await createAccount(userId, { name });

  return redirect("/accounts");
}

export async function loader({ request }: DataFunctionArgs) {
  const userId = await requireUserId(request);

  const assetClasses = await getAssetClasses(userId);

  return json({ assetClasses });
}

export const meta: V2_MetaFunction = () => [{ title: getTitle("New Account") }];

export default function NewAccountPage() {
  const { assetClasses } = useLoaderData<typeof loader>();
  return (
    <Form method="post">
      <Input name="name" label="Name" />
      <RadioGroup
        name="type"
        label="Type"
        options={[
          { label: "Asset", value: AccountType.ASSET },
          { label: "Liability", value: AccountType.LIABILITY },
        ]}
        defaultValue={AccountType.ASSET}
      />
      <Select name="assetClassId" label="Asset Class">
        <option />
        {assetClasses.map((ac) => (
          <option key={ac.id}>{ac.name}</option>
        ))}
      </Select>
      <RadioGroup
        name="unit"
        label="Unit"
        options={[
          { label: "Currency", value: AccountUnit.CURRENCY },
          { label: "Stock", value: AccountUnit.STOCK },
        ]}
        defaultValue={AccountUnit.CURRENCY}
      />
      <CurrencyCombobox name="currency" label="Currency" />
      <DetailedRadioGroup
        label="When was the account opened?"
        name="preExisting"
        defaultValue="off"
        options={[
          {
            label: "Before accounting start",
            value: "on",
            description:
              "This is a pre-existing account. It has a balance on the day before the accounting start date.",
          },
          {
            label: "After accounting start",
            value: "off",
            description:
              "The account was opened on or after the accounting start date.",
          },
        ]}
      />
      <Button type="submit">Create</Button>
    </Form>
  );
}
