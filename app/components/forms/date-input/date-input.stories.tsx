import type { Meta, StoryObj } from "@storybook/react";
import { DateInput } from "./date-input";
import { I18nProvider } from "react-aria";

const meta: Meta<typeof DateInput> = {
  title: "components/forms/DateInput",
  component: DateInput,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <I18nProvider locale={context.globals.locale}>
        <Story />
      </I18nProvider>
    ),
  ],
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
