import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import {
  AccountFormFields,
  type AccountFormFieldsProps,
} from "~/accounts/account-form-fields";
import { Button } from "~/common/buttons/button";
import { FormPageHeader } from "~/common/form-page-header";

export type PageProps = {
  errors: AccountFormFieldsProps["errors"];
  values: AccountFormFieldsProps["values"];
  data: Omit<AccountFormFieldsProps["data"], "account">;
};

export function Page({ data, errors, values }: PageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 px-4 py-8">
        <FormPageHeader icon={PlusIcon} variant="positive">
          Add Account
        </FormPageHeader>

        <AccountFormFields data={data} errors={errors} values={values} />

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
