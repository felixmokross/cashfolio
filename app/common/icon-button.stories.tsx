import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, LinkIconButton } from "./icon-button";
import {
  Cog6ToothIcon as SolidCog6ToothIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  HomeIcon,
} from "@heroicons/react/20/solid";
import { Cog6ToothIcon as OutlineCog6ToothIcon } from "@heroicons/react/24/outline";
import { withAppProviders } from "./storybook";

const meta: Meta<typeof IconButton> = {
  title: "components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  decorators: [withAppProviders],
};

export default meta;

type Story = StoryObj<typeof IconButton>;

export const WithEllipsisVerticalIcon: Story = {
  args: { altText: "Options", icon: EllipsisVerticalIcon },
};

export const WithPencilIcon: Story = {
  args: { altText: "Edit", icon: PencilSquareIcon },
};

export const WithSolidCog6ToothIcon: Story = {
  args: { altText: "Settings", icon: SolidCog6ToothIcon },
};

export const LargeWithOutlineCog6ToothIcon: Story = {
  args: { altText: "Settings", icon: OutlineCog6ToothIcon, size: "large" },
};

export const LinkWithHomeIcon: StoryObj<typeof LinkIconButton> = {
  args: { altText: "Home", icon: HomeIcon, to: "/example" },
  render: (args) => <LinkIconButton {...args} />,
};
