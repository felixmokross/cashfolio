import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./nav-bar";
import { withAppProviders } from "../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";

const meta: Meta<typeof NavBar> = {
  title: "components/NavBar",
  component: NavBar,
  decorators: [withAppProviders, withRootLayout],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {
  args: {},
};
