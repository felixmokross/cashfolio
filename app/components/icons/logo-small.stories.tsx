import type { Meta, StoryObj } from "@storybook/react";
import { LogoSmall } from "./logo-small";

const meta: Meta<typeof LogoSmall> = {
  title: "components/icons/LogoSmall",
  component: LogoSmall,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LogoSmall>;

export const Default: Story = {
  args: {
    className: "h-10 w-auto",
  },
};
