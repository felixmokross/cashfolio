import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";

const meta: Meta<typeof Page> = {
  title: "routes/_app/balance-change-categories/new/Page",
  component: Page,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {},
};
