import { PlusIcon } from "@heroicons/react/24/outline";
import {
  AccountFormFields,
  type AccountFormFieldsProps,
} from "~/accounts/account-form-fields";
import { FormPage } from "~/common/form-page";

export type PageProps = {
  errors: AccountFormFieldsProps["errors"];
  values: AccountFormFieldsProps["values"];
  data: Omit<AccountFormFieldsProps["data"], "account">;
};

export function Page({ data, errors, values }: PageProps) {
  return (
    <FormPage
      title="New Account"
      icon={PlusIcon}
      variant="positive"
      submitButtonLabel="Create"
    >
      <AccountFormFields data={data} errors={errors} values={values} />
    </FormPage>
  );
}
