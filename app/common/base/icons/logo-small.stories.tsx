import type { Meta, StoryObj } from "@storybook/react";
import { LogoSmall } from "./logo-small";

const meta: Meta<typeof LogoSmall> = {
  title: "base/icons/LogoSmall",
  component: LogoSmall,
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof LogoSmall>;

export const Default: Story = {
  args: {
    className: "h-10 w-auto",
  },
};
