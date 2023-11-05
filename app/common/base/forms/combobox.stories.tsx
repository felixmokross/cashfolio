import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "base/forms/Combobox",
  component: Combobox,
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

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-combobox",
    placeholder: "Select an option",
    options: [
      { value: "1", primaryText: "Option 1", secondaryText: "one" },
      { value: "2", primaryText: "Option 2", secondaryText: "two" },
      { value: "3", primaryText: "Option 3", secondaryText: "three" },
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

export const Compact: Story = {
  args: {
    ...Default.args,
    label: undefined,
    size: "compact",
  },
};
