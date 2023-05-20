import type { Meta, StoryObj } from "@storybook/react";
import { NavBar } from "./nav-bar";

const meta: Meta<typeof NavBar> = {
  title: "components/NavBar",
  component: NavBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {
  args: {},
};
