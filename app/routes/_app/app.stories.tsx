import type { Meta, StoryObj } from "@storybook/react";
import { App } from "./app";
import { buildExtendedUserDto } from "~/users/builders";
import { PageHeader } from "~/common/page-header";
import { withContainer } from "~/common/storybook";

const meta: Meta<typeof App> = {
  title: "routes/_app/App",
  component: App,
  decorators: [withContainer],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  args: {
    user: buildExtendedUserDto(),
    children: (
      <>
        <PageHeader>Example Header</PageHeader>
      </>
    ),
  },
};
