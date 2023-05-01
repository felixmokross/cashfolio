import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { HomeIcon } from "@heroicons/react/20/solid";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Example" },
};

export const PrimaryWithIcon: Story = {
  args: { ...Primary.args, icon: HomeIcon },
};

export const Secondary: Story = {
  args: { ...Primary.args, variant: "secondary" },
};

export const SecondaryWithIcon: Story = {
  args: { ...Secondary.args, icon: HomeIcon },
};
