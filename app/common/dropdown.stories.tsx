import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown, DropdownItem } from "./dropdown";
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
    children: (
      <>
        <DropdownItem as={Link} to="/settings">
          Go to settings
        </DropdownItem>
        <DropdownItem as={Link} to="/other-page">
          Other page
        </DropdownItem>
        <DropdownItem onClick={() => alert("hello")}>Button</DropdownItem>
      </>
    ),
  },
};
