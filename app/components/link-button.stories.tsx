import type { Meta, StoryObj } from "@storybook/react";
import { LinkButton } from "./link-button";
import { HomeIcon } from "@heroicons/react/20/solid";

const meta: Meta<typeof LinkButton> = {
  title: "components/LinkButton",
  component: LinkButton,
  tags: ["autodocs"],
  argTypes: {
    children: {
      description: "The content of the button.",
      table: { type: { summary: "React.ReactNode" } },
    },
    icon: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Example",
    to: "/example",
  },
};

export const PrimaryWithIcon: Story = {
  args: { ...Primary.args, icon: HomeIcon },
  parameters: {
    docs: {
      source: {
        code: `import { HomeIcon } from "@heroicons/react/20/solid";

<LinkButton variant="primary" icon={HomeIcon} to="/example">
  Example
</LinkButton>`,
      },
    },
  },
};

export const Secondary: Story = {
  args: { ...Primary.args, variant: "secondary", to: "/example" },
};

export const SecondaryWithIcon: Story = {
  args: { ...Secondary.args, icon: HomeIcon, to: "/example" },
  parameters: {
    docs: {
      source: {
        code: `import { HomeIcon } from "@heroicons/react/20/solid";

<LinkButton variant="secondary" icon={HomeIcon} to="/example">
  Example
</LinkButton>`,
      },
    },
  },
};
