import type { Meta, StoryObj } from "@storybook/react";
import { FormattedNumberInput } from "./formatted-number-input";
import { LocaleProvider } from "../locale-context";

const meta: Meta<typeof FormattedNumberInput> = {
  title: "forms/FormattedNumberInput",
  component: FormattedNumberInput,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <LocaleProvider locale={context.globals.locale}>
        <Story />
      </LocaleProvider>
    ),
  ],
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
