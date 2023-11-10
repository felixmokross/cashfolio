import type { Meta, StoryObj } from "@storybook/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { withPageMaxWidth } from "./storybook";
import { FormPage } from "./form-page";
import { Input } from "./base/forms/input";
import { Select } from "./base/forms/select";

const meta: Meta<typeof FormPage> = {
  title: "components/FormPage",
  component: FormPage,
  decorators: [withPageMaxWidth],
};

export default meta;

type Story = StoryObj<typeof FormPage>;

export const Default: Story = {
  args: {
    title: "New Transaction",
    icon: PlusIcon,
    variant: "positive",
    children: (
      <>
        <Input name="name" label="Name" groupClassName="col-span-3" />
        <Input
          name="placeOfBirth"
          label="Place of Birth"
          groupClassName="col-span-3"
        />
        <Select
          name="nationality"
          label="Nationality"
          groupClassName="col-span-6"
        />
      </>
    ),
    submitButtonLabel: "Create",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
