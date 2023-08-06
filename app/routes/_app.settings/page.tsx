import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { Form, type useNavigation } from "@remix-run/react";
import { Alert } from "~/common/alert";
import { Button } from "~/common/button";
import { CurrencyCombobox } from "~/common/forms/currency-combobox";
import { LocaleCombobox } from "~/common/forms/locale-combobox";
import type { FormErrors } from "~/common/forms/types";
import { FormPageHeader } from "~/common/form-page-header";
import { useUser } from "~/common/user-context";

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
  formattingSampleDate: Date;
};

export function Page({
  message,
  locales,
  actionData,
  onAlertDismiss,
  state,
  formattingSampleDate,
}: PageProps) {
  const { preferredLocale, refCurrency } = useUser();
  return (
    <Form
      method="post"
      noValidate
      className="mx-auto flex max-w-sm flex-col px-4 py-8"
    >
      <fieldset disabled={state !== "idle"} className="contents">
        <FormPageHeader icon={Cog6ToothIcon} variant="neutral">
          Settings
        </FormPageHeader>

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
            formattingSampleDate={formattingSampleDate}
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
