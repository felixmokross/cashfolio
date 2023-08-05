import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AccountFormProps } from "~/components/accounts";
import { AccountFormFields } from "~/components/accounts";
import { Button } from "~/components/button";
import { PageHeading } from "~/components/page-heading";

export type PageProps = {
  errors: AccountFormProps["errors"];
  values: AccountFormProps["values"];
  data: Omit<AccountFormProps["data"], "account">;
};

export function Page({ data, errors, values }: PageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 px-4 py-8">
        <PageHeading icon={PlusIcon} variant="positive">
          New Account
        </PageHeading>

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
