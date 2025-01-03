import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { User } from "@prisma/client";
import { type useNavigation } from "react-router";
import { Alert } from "~/common/base/alert";
import { CurrencyCombobox } from "~/common/forms/currency-combobox";
import { LocaleCombobox } from "~/common/forms/locale-combobox";
import type { FormErrors } from "~/common/forms/types";
import { useUser } from "~/common/user-context";
import { FormPage } from "~/common/form-page";

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
    <FormPage
      title="Settings"
      icon={Cog6ToothIcon}
      variant="neutral"
      submitButtonLabel="Save"
      disabled={state === "submitting"}
    >
      {message && state !== "submitting" && (
        <Alert onDismiss={onAlertDismiss} className="col-span-6">
          {message}
        </Alert>
      )}
      <LocaleCombobox
        label="Currency and Date Format"
        name="preferredLocale"
        defaultValue={actionData?.values.preferredLocale || preferredLocale}
        error={actionData?.errors?.preferredLocale}
        locales={locales}
        formattingSampleDate={formattingSampleDate}
        groupClassName="col-span-6"
      />
      <CurrencyCombobox
        label="Main Currency"
        name="refCurrency"
        defaultValue={actionData?.values.refCurrency || refCurrency}
        error={actionData?.errors?.refCurrency}
        groupClassName="col-span-6"
      />
    </FormPage>
  );
}
