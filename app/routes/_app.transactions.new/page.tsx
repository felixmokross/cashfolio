import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button } from "~/components/button";
import { PageHeader } from "~/components/page-header";

export function Page() {
  return (
    <div className="flex justify-center">
      <Form method="post" className="flex max-w-lg flex-col gap-8 px-4 py-8">
        <PageHeader icon={PlusIcon} variant="positive">
          New Transaction
        </PageHeader>

        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
