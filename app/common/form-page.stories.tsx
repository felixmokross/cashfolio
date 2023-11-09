import type { Meta, StoryObj } from "@storybook/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { withPageMaxWidth } from "./storybook";
import { FormPage } from "./form-page";
import { Input } from "./base/forms/input";

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
        <Input name="name" label="Name" className="w-full" />
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
