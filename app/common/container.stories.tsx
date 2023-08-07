import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "./container";
import { NavBar } from "./nav-bar";

const meta: Meta<typeof Container> = {
  title: "components/Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    children: (
      <>
        <NavBar />
        <p className="px-4 py-2">Page content</p>
      </>
    ),
  },
};
