import { PencilIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AccountFormFieldsProps } from "~/accounts/account-form-fields";
import { AccountFormFields } from "~/accounts/account-form-fields";
import { Button } from "~/common/base/buttons/button";
import { FormPageHeader } from "~/common/form-page-header";

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
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 p-4">
        <FormPageHeader icon={PencilIcon} variant="neutral">
          Edit Account
        </FormPageHeader>

        <AccountFormFields data={data} values={values} errors={errors} />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
