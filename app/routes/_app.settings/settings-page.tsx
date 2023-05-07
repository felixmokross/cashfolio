import type { User } from "@prisma/client";
import { Form, useNavigation } from "@remix-run/react";
import { Alert } from "~/components/alert";
import { Button } from "~/components/button";
import { CurrencyCombobox } from "~/components/forms/currency-combobox";
import { LocaleCombobox } from "~/components/forms/locale-combobox";
import type { FormErrors } from "~/components/forms/types";
import { useUser } from "~/components/user-context";

export type ActionData = {
  errors: FormErrors<SettingsValues>;
};

type SettingsValues = Partial<Pick<User, "refCurrency" | "preferredLocale">>;

export type SettingsPageProps = {
  message?: string;
  locales: [string, string][];
  actionData?: ActionData;
};

export function SettingsPage({
  message,
  locales,
  actionData,
}: SettingsPageProps) {
  const { state } = useNavigation();
  const { preferredLocale, refCurrency } = useUser();
  return (
    <Form method="post" noValidate className="mx-auto flex max-w-sm flex-col">
      <fieldset disabled={state !== "idle"} className="contents">
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">Settings</h2>

        <div className="mt-10 flex flex-col gap-4">
          {message && <Alert>{message}</Alert>}
          <LocaleCombobox
            label="Currency and Date Format"
            name="preferredLocale"
            defaultValue={preferredLocale}
            error={actionData?.errors?.preferredLocale}
            locales={locales}
          />

          <CurrencyCombobox
            label="Main Currency"
            name="refCurrency"
            defaultValue={refCurrency}
            error={actionData?.errors?.refCurrency}
          />
        </div>
        <Button type="submit" variant="primary" className="mt-10">
          {state === "submitting" ? "Saving…" : "Save"}
        </Button>
      </fieldset>
    </Form>
  );
}
