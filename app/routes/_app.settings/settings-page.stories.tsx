import type { Meta, StoryObj } from "@storybook/react";
import { SettingsPage } from "./settings-page";
import { getLocalesWithDisplayName } from "~/locales.server";

const meta: Meta<typeof SettingsPage> = {
  title: "SettingsPage",
  component: SettingsPage,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SettingsPage>;

export const Default: Story = {
  args: {
    locales: getLocalesWithDisplayName(),
  },
};
