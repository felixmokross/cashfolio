import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";

const meta: Meta<typeof Page> = {
  title: "routes/_app/transactions/new/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {},
};
