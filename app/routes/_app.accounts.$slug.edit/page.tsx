import { PencilIcon } from "@heroicons/react/24/outline";
import type { AccountFormFieldsProps } from "~/accounts/account-form-fields";
import { AccountFormFields } from "~/accounts/account-form-fields";
import { FormPage } from "~/common/form-page";

export type PageProps = {
  errors: AccountFormFieldsProps["errors"];
  values: AccountFormFieldsProps["values"];
  data: {
    assetClasses: AccountFormFieldsProps["data"]["assetClasses"];
    account: Required<AccountFormFieldsProps["data"]["account"]>;
  };
};

export function Page({ data, errors, values }: PageProps) {
  return (
    <FormPage
      title="Edit Account"
      icon={PencilIcon}
      variant="neutral"
      submitButtonLabel="Save"
    >
      <AccountFormFields data={data} values={values} errors={errors} />
    </FormPage>
  );
}
