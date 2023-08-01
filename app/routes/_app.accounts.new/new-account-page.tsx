import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AccountFormProps } from "~/components/accounts";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";

export type NewAccountPageProps = {
  errors: AccountFormProps["errors"];
  values: AccountFormProps["values"];
  data: Omit<AccountFormProps["data"], "account">;
};

export function NewAccountPage({ data, errors, values }: NewAccountPageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 p-4">
        <div className="col-span-6 flex flex-col items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-positive-100">
            <PlusIcon className="h-6 w-6 text-positive-600" />
          </span>
          <h2 className="text-lg font-medium text-gray-800">New Account</h2>
        </div>

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
