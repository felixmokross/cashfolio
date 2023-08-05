import { PencilIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AccountFormProps } from "~/components/accounts";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";
import { PageHeader } from "~/components/page-header";

export type PageProps = {
  errors: AccountFormProps["errors"];
  values: AccountFormProps["values"];
  data: {
    assetClasses: AccountFormProps["data"]["assetClasses"];
    account: Required<AccountFormProps["data"]["account"]>;
  };
};

export function Page({ data, errors, values }: PageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 p-4">
        <PageHeader icon={PencilIcon} variant="neutral">
          Edit Account
        </PageHeader>

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
