import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./nav-bar";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";
import { withAppProviders } from "../../.storybook/decorators/withAppProviders";
import { buildExtendedUserDto } from "~/users/builders";

const meta: Meta<typeof NavBar> = {
  title: "components/NavBar",
  component: NavBar,
  decorators: [withAppProviders, withRootLayout],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const WithUser: Story = {
  args: { user: buildExtendedUserDto() },
};

export const WithoutUser: Story = {
  args: { user: undefined },
};
