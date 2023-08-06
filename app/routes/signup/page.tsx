import { Form } from "@remix-run/react";
import { Button } from "~/common/button";
import { CurrencyCombobox } from "~/common/forms/currency-combobox";
import { LocaleCombobox } from "~/common/forms/locale-combobox";
import type { SignupValues } from "./types";
import type { FormErrors } from "~/common/forms/types";
import { FormPageHeader } from "~/common/form-page-header";
import { UserIcon } from "@heroicons/react/24/outline";
import { NavBar } from "~/common/nav-bar";

export type PageProps = {
  suggestedLocale: string;
  suggestedCurrency: string;
  locales: [string, string][];
  values?: SignupValues;
  errors?: FormErrors<SignupValues>;
};

export function Page({
  suggestedLocale,
  suggestedCurrency,
  locales,
  values,
  errors,
}: PageProps) {
  return (
    <>
      <NavBar />
      <Form
        method="post"
        noValidate
        className="mx-auto flex max-w-sm flex-col px-4 py-8"
      >
        <FormPageHeader icon={UserIcon} variant="positive">
          Complete Signup
        </FormPageHeader>
        <div className="mt-10 flex flex-col gap-4">
          <LocaleCombobox
            label="Currency and Date Format"
            name="preferredLocale"
            defaultValue={values?.preferredLocale || suggestedLocale}
            autoFocus={true}
            error={errors?.preferredLocale}
            locales={locales}
            formattingSampleDate={new Date()}
          />

          <CurrencyCombobox
            label="Main Currency"
            name="refCurrency"
            defaultValue={values?.refCurrency || suggestedCurrency}
            error={errors?.refCurrency}
          />
        </div>
        <Button type="submit" variant="primary" className="mt-10">
          Start Using Cashfolio
        </Button>
      </Form>
    </>
  );
}
