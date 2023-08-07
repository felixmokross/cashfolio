import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";
import { withPageMaxWidth } from "./storybook";

const meta: Meta<typeof Alert> = {
  title: "components/Alert",
  component: Alert,
  argTypes: {
    children: {
      description: "The content of the alert.",
      table: { type: { summary: "React.ReactNode" } },
    },
  },
  decorators: [withPageMaxWidth],
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: { children: "Example" },
};
