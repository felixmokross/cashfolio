import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./radio-group";

const meta: Meta<typeof RadioGroup> = {
  title: "base/forms/RadioGroup",
  component: RadioGroup,
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

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-radio-group",
    defaultValue: "1",
    options: [
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
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

export const ManyOptions: Story = {
  args: {
    label: "Booking Type",
    name: "my-radio-group",
    defaultValue: "1",
    options: [
      { value: "1", label: "Transfer" },
      { value: "2", label: "Balance Change" },
      { value: "3", label: "Value Change" },
    ],
  },
};

export const Compact: Story = {
  args: {
    size: "compact",
    name: "my-radio-group",
    defaultValue: "1",
    options: [
      { value: "1", label: "Transfer" },
      { value: "2", label: "Balance Change" },
      { value: "3", label: "Value Change" },
    ],
  },
};

export const OptionColors: Story = {
  args: {
    name: "my-radio-group",
    defaultValue: "1",
    options: [
      { value: "1", label: "Income", variant: "positive" },
      { value: "2", label: "Expense", variant: "negative" },
    ],
  },
};
