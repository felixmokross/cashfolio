import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { getLocalesWithDisplayName } from "~/common/locales.server";
import { withContainer } from "~/common/storybook";

const meta: Meta<typeof Page> = {
  title: "routes/signup/Page",
  component: Page,
  decorators: [withContainer],
  parameters: { layout: "fullscreen" },
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
