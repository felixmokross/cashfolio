import type { Meta, StoryObj } from "@storybook/react";
import { DetailedRadioGroup } from "./detailed-radio-group";

const meta: Meta<typeof DetailedRadioGroup> = {
  title: "components/forms/DetailedRadioGroup",
  component: DetailedRadioGroup,
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof DetailedRadioGroup>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-detailed-radio-group",
    defaultValue: "1",
    options: [
      {
        value: "1",
        label: "Option 1",
        description: "This text described Option 1 in detail.",
      },
      {
        value: "2",
        label: "Option 2",
        description: "This text described Option 2 in detail.",
      },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: "This field is required",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
