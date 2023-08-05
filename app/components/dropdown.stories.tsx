import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./dropdown";
import { Link } from "@remix-run/react";
import { withAppProviders } from "../../.storybook/decorators/withAppProviders";

const meta: Meta<typeof Dropdown> = {
  title: "components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  decorators: [withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    items: [
      { as: Link, to: "/settings", children: "Go to settings" },
      { as: Link, to: "/other-page", children: "Other page" },
      { as: "button", onClick: () => alert("hello"), children: "Button" },
    ],
  },
};
