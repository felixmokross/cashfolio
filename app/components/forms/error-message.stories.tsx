import type { Meta, StoryObj } from "@storybook/react";
import { ErrorMessage } from "./error-message";

const meta: Meta<typeof ErrorMessage> = {
  title: "components/forms/ErrorMessage",
  component: ErrorMessage,
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    error: "This field is required",
    errorId: "my-error-id",
  },
};
