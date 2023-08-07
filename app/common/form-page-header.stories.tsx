import type { Meta, StoryObj } from "@storybook/react";
import { FormPageHeader } from "./form-page-header";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { withPageMaxWidth } from "./storybook";

const meta: Meta<typeof FormPageHeader> = {
  title: "components/FormPageHeader",
  component: FormPageHeader,
  decorators: [withPageMaxWidth],
};

export default meta;

type Story = StoryObj<typeof FormPageHeader>;

export const Positive: Story = {
  args: {
    children: "New Transaction",
    icon: PlusIcon,
    variant: "positive",
  },
};

export const Neutral: Story = {
  args: {
    children: "Edit Transaction",
    icon: PencilIcon,
    variant: "neutral",
  },
};
