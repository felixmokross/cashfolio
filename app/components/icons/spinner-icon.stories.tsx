import type { Meta, StoryObj } from "@storybook/react";
import { SpinnerIcon } from "./spinner-icon";

const meta: Meta<typeof SpinnerIcon> = {
  title: "components/icons/SpinnerIcon",
  component: SpinnerIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SpinnerIcon>;

export const Default: Story = {
  args: {
    className: "w-5 h-5 text-gray-700 animate-spin",
  },
};
