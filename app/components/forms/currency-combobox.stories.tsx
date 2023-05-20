import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyCombobox } from "./currency-combobox";

const meta: Meta<typeof CurrencyCombobox> = {
  title: "components/forms/CurrencyCombobox",
  component: CurrencyCombobox,
  tags: ["autodocs"],
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
