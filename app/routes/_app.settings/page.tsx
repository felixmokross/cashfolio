import type { User } from "@prisma/client";
import { Form, type useNavigation } from "@remix-run/react";
import { Alert } from "~/components/alert";
import { Button } from "~/components/button";
import { CurrencyCombobox } from "~/components/forms/currency-combobox";
import { LocaleCombobox } from "~/components/forms/locale-combobox";
import type { FormErrors } from "~/components/forms/types";
import { useUser } from "~/components/user-context";

export type ActionData = {
  errors: FormErrors<SettingsValues>;
  values: SettingsValues;
};

export type SettingsValues = Partial<
  Pick<User, "refCurrency" | "preferredLocale">
>;

export type PageProps = {
  message?: string;
  locales: [string, string][];
  actionData?: ActionData;
  onAlertDismiss: () => void;
  state: ReturnType<typeof useNavigation>["state"];
};

export function Page({
  message,
  locales,
  actionData,
  onAlertDismiss,
  state,
}: PageProps) {
  const { preferredLocale, refCurrency } = useUser();
  return (
    <Form method="post" noValidate className="mx-auto flex max-w-sm flex-col">
      <fieldset disabled={state !== "idle"} className="contents">
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Settings</h2>

        <div className="mt-10 flex flex-col gap-4">
          {message && state !== "submitting" && (
            <Alert onDismiss={onAlertDismiss}>{message}</Alert>
          )}
          <LocaleCombobox
            label="Currency and Date Format"
            name="preferredLocale"
            defaultValue={actionData?.values.preferredLocale || preferredLocale}
            error={actionData?.errors?.preferredLocale}
            locales={locales}
          />

          <CurrencyCombobox
            label="Main Currency"
            name="refCurrency"
            defaultValue={actionData?.values.refCurrency || refCurrency}
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
