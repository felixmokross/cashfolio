import type { Meta, StoryObj } from "@storybook/react";
import { PageHeading } from "./page-heading";

const meta: Meta<typeof PageHeading> = {
  title: "components/PageHeading",
  component: PageHeading,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof PageHeading>;

export const Default: Story = {
  args: {
    children: "Accounts",
  },
};
