import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { getLocalesWithDisplayName } from "~/locales.server";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";

const meta: Meta<typeof Page> = {
  title: "routes/_app/settings/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
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
