import type { Meta, StoryObj } from "@storybook/react";
import { PageHeader } from "./page-header";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof PageHeader> = {
  title: "components/PageHeader",
  component: PageHeader,
  decorators: [withRootLayout],
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

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
