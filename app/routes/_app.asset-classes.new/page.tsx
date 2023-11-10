import { PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "~/common/base/forms/input";
import { FormPage } from "~/common/form-page";

export function Page() {
  return (
    <FormPage
      title="New Asset Class"
      icon={PlusIcon}
      variant="positive"
      submitButtonLabel="Create"
    >
      <Input name="name" label="Name" groupClassName="col-span-6" />
    </FormPage>
  );
}
