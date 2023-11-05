import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./date-input";
import { withAppProviders } from "~/common/storybook";

const meta: Meta<typeof DateInput> = {
  title: "base/forms/DateInput",
  component: DateInput,
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
    withAppProviders,
  ],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Default: Story = {
  args: {
    label: "Example date",
    name: "exampleDate",
    defaultValue: "2023-03-01",
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    defaultValue: "",
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
    size: "compact",
    label: undefined,
  },
};
