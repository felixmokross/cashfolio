import type { Meta, StoryObj } from "@storybook/react";
import { PageHeading } from "./page-heading";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";

const meta: Meta<typeof PageHeading> = {
  title: "components/PageHeading",
  component: PageHeading,
  decorators: [withRootLayout],
};

export default meta;

type Story = StoryObj<typeof PageHeading>;

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
