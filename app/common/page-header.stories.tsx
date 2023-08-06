import type { Meta, StoryObj } from "@storybook/react";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";
import { PageHeader } from "./page-header";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";

const meta: Meta<typeof PageHeader> = {
  title: "components/PageHeader",
  component: PageHeader,
  decorators: [withRootLayout],
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    children: "Accounts",
    actions: (
      <>
        <Button variant="primary" icon={PlusIcon}>
          Action 1
        </Button>
        <Button icon={Cog6ToothIcon}>Action 2</Button>
      </>
    ),
  },
};
