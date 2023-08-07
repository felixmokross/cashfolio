import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./nav-bar";
import { buildExtendedUserDto } from "~/users/builders";
import { withAppProviders, withPageMaxWidth } from "./storybook";

const meta: Meta<typeof NavBar> = {
  title: "components/NavBar",
  component: NavBar,
  decorators: [withAppProviders, withPageMaxWidth],
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
