import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Link } from "@remix-run/react";

/**
 * The element rendered by the `Button` component can be set using the `as`
 * prop. By default a `button` element is rendered. Additional props are
 * forwarded to the rendered element.
 *
 * E.g. to render a form submit button with primary variant:
 *
 * ```tsx
 * <Button variant="primary" type="submit">
 *   Example
 * <Button>
 * ```
 */
const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "The variant of the button.",
    },
    children: {
      description: "The content of the button.",
      table: { type: { summary: "React.ReactNode" } },
    },
    as: {
      description:
        "React Element Type as which the button should be rendered. Additional props are passed to the rendered element. For a link, use `Link` from `@remix-run/react` and add the `to` prop.",
      control: false,
      defaultValue: "button",
      table: {
        type: { summary: "React.ElementType" },
        defaultValue: { summary: '"button"' },
      },
    },
    icon: {
      description:
        "Component Type of the icon to be rendered in front of the button content. If not specified, the button is rendered without an icon.",
      control: false,
    },
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

export const PrimaryLink: Story = {
  args: {
    ...Primary.args,
    as: Link,
    to: "/example",
  },
  parameters: {
    docs: {
      source: {
        code: `import { Link } from "@remix-run/react";

<Button variant="primary" as={Link} to="/example">
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
