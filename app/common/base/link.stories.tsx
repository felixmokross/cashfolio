import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";
import { withAppProviders } from "../storybook";

const meta: Meta<typeof Link> = {
  title: "base/Link",
  component: Link,
  decorators: [withAppProviders],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    to: "/example",
    children: "Example",
  },
};
