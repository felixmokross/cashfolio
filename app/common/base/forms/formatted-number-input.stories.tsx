import type { Meta, StoryObj } from "@storybook/react";
import { FormattedNumberInput } from "./formatted-number-input";
import { withAppProviders } from "../../storybook";

const meta: Meta<typeof FormattedNumberInput> = {
  title: "base/forms/FormattedNumberInput",
  component: FormattedNumberInput,
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

type Story = StoryObj<typeof FormattedNumberInput>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-formatted-number-input",
    value: "1234.56",
  },
};

export const WithCurrencyAdornment: Story = {
  args: {
    ...Default.args,
    adornment: "CHF",
  },
};

export const Compact: Story = {
  args: {
    ...Default.args,
    label: undefined,
    size: "compact",
  },
};
