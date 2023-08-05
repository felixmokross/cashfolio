import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button } from "~/components/button";
import { PageHeading } from "~/components/page-heading";

export function Page() {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 px-4 py-8">
        <PageHeading icon={PlusIcon} variant="positive">
          New Transaction
        </PageHeading>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
