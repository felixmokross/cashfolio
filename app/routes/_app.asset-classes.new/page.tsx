import { PlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button } from "~/common/base/buttons/button";
import { Input } from "~/common/base/forms/input";
import { FormPageHeader } from "~/common/form-page-header";

export function Page() {
  return (
    <div className="flex justify-center">
      <Form method="post" className="max-w-lg space-y-8 w-full px-4 py-8">
        <FormPageHeader icon={PlusIcon} variant="positive">
          New Asset Class
        </FormPageHeader>
        <Input name="name" label="Name" className="w-full" />
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </Form>
    </div>
  );
}
