import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { getLocalesWithDisplayName } from "~/common/locales.server";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";

const meta: Meta<typeof Page> = {
  title: "routes/_app/settings/Page",
  component: Page,
  decorators: [withAppProviders, withPageMaxWidth],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    locales: getLocalesWithDisplayName(),
    state: "idle",
    formattingSampleDate: new Date("2021-01-23"),
  },
};

export const WithAlert: Story = {
  args: {
    ...Default.args,
    message: "Settings updated successfully",
  },
};
