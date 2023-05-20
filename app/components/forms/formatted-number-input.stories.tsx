import type { Meta, StoryObj } from "@storybook/react";
import { FormattedNumberInput } from "./formatted-number-input";

const meta: Meta<typeof FormattedNumberInput> = {
  title: "components/forms/FormattedNumberInput",
  component: FormattedNumberInput,
  tags: ["autodocs"],
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
