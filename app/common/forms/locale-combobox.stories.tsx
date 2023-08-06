import type { Meta, StoryObj } from "@storybook/react";
import { LocaleCombobox } from "./locale-combobox";
import { getLocalesWithDisplayName } from "~/common/locales.server";

const meta: Meta<typeof LocaleCombobox> = {
  title: "components/forms/LocaleCombobox",
  component: LocaleCombobox,
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

type Story = StoryObj<typeof LocaleCombobox>;

export const Default: Story = {
  args: {
    label: "Currency and Date Format",
    name: "preferredLocale",
    locales: getLocalesWithDisplayName(),
    defaultValue: "en-US",
    formattingSampleDate: new Date("2021-01-23"),
  },
};
