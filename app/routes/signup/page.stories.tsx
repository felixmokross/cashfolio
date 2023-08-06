import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { getLocalesWithDisplayName } from "~/locales.server";
import { withRootFrame } from "../../../.storybook/decorators/withRootFrame";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";

const meta: Meta<typeof Page> = {
  title: "routes/signup/Page",
  component: Page,
  decorators: [withRootFrame, withAppProviders],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    suggestedLocale: "de-CH",
    suggestedCurrency: "CHF",
    locales: getLocalesWithDisplayName(),
  },
};
