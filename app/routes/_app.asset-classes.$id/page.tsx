import { PencilIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import type { AssetClassDto } from "~/asset-classes/types";
import { Button } from "~/common/base/buttons/button";
import { Input } from "~/common/base/forms/input";
import { FormPageHeader } from "~/common/form-page-header";

export type PageProps = {
  assetClass: AssetClassDto;
};

export function Page({ assetClass }: PageProps) {
  return (
    <div className="flex justify-center">
      <Form method="post" className="max-w-lg space-y-8 w-full px-4 py-8">
        <FormPageHeader icon={PencilIcon} variant="neutral">
          Edit Asset Class
        </FormPageHeader>
        <Input
          name="name"
          label="Name"
          defaultValue={assetClass.name}
          className="w-full"
        />
        <div className="flex justify-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
