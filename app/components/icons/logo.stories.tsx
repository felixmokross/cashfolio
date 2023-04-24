import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./logo";

const meta: Meta<typeof Logo> = {
  title: "icons/Logo",
  component: Logo,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    className: "h-10 w-auto",
  },
};
