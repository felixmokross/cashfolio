import type { Meta, StoryObj } from "@storybook/react";
import { LocaleCombobox } from "./locale-combobox";
import { getLocalesWithDisplayName } from "~/locales.server";

const meta: Meta<typeof LocaleCombobox> = {
  title: "forms/LocaleCombobox",
  component: LocaleCombobox,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LocaleCombobox>;

export const Default: Story = {
  args: {
    label: "Currency and Date Format",
    name: "preferredLocale",
    locales: getLocalesWithDisplayName(),
    defaultValue: "en-US",
  },
};
