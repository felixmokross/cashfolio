import { PencilIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AccountFormProps } from "~/components/accounts";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";

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
        <div className="col-span-6 flex flex-col items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
            <PencilIcon className="h-6 w-6 text-neutral-600" />
          </span>
          <h2 className="text-lg font-medium text-gray-800">Edit Account</h2>
        </div>

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
