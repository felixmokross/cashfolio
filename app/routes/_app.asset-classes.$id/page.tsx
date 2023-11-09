import { PencilIcon } from "@heroicons/react/24/outline";
import type { AssetClassDto } from "~/asset-classes/types";
import { Input } from "~/common/base/forms/input";
import { FormPage } from "~/common/form-page";

export type PageProps = {
  assetClass: AssetClassDto;
};

export function Page({ assetClass }: PageProps) {
  return (
    <FormPage
      title="Edit Asset Class"
      icon={PencilIcon}
      variant="neutral"
      submitButtonLabel="Save"
    >
      <Input
        name="name"
        label="Name"
        defaultValue={assetClass.name}
        className="w-full"
      />
    </FormPage>
  );
}
