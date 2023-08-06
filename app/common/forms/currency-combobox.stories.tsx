import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyCombobox } from "./currency-combobox";

const meta: Meta<typeof CurrencyCombobox> = {
  title: "components/forms/CurrencyCombobox",
  component: CurrencyCombobox,
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

type Story = StoryObj<typeof CurrencyCombobox>;

export const Default: Story = {
  args: {
    label: "Example",
    name: "my-currency-combobox",
    defaultValue: "CHF",
  },
};
