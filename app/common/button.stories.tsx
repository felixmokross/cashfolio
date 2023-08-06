import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { HomeIcon } from "@heroicons/react/20/solid";

const meta: Meta<typeof Button> = {
  title: "components/Button",
  component: Button,
  argTypes: {
    children: {
      description: "The content of the button.",
      table: { type: { summary: "React.ReactNode" } },
    },
    as: {
      control: false,
      defaultValue: "button",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: '"button"' },
      },
    },
    icon: {
      control: false,
    },
  },
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary", children: "Example" },
};

export const PrimaryWithIcon: Story = {
  args: { ...Primary.args, icon: HomeIcon },
  parameters: {
    docs: {
      source: {
        code: `import { HomeIcon } from "@heroicons/react/20/solid";

<Button variant="primary" icon={HomeIcon}>
  Example
</Button>`,
      },
    },
  },
};

export const Negative: Story = {
  args: { ...Primary.args, variant: "negative" },
};

export const NegativeWithIcon: Story = {
  args: { ...Negative.args, icon: HomeIcon },
  parameters: {
    docs: {
      source: {
        code: `import { HomeIcon } from "@heroicons/react/20/solid";

<Button variant="negative" icon={HomeIcon}>
  Example
</Button>`,
      },
    },
  },
};

export const Secondary: Story = {
  args: { ...Primary.args, variant: "secondary" },
};

export const SecondaryWithIcon: Story = {
  args: { ...Secondary.args, icon: HomeIcon },
  parameters: {
    docs: {
      source: {
        code: `import { HomeIcon } from "@heroicons/react/20/solid";

<Button variant="secondary" icon={HomeIcon}>
  Example
</Button>`,
      },
    },
  },
};

export const SubmitButton: Story = {
  args: { ...Primary.args, type: "submit" },
};

export const Compact: Story = {
  args: { ...Primary.args, size: "compact" },
};
