import type { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "./main-menu";
import { Disclosure } from "@headlessui/react";
import { withAppProviders } from "../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";

const meta: Meta<typeof MainMenu> = {
  title: "components/MainMenu",
  component: MainMenu,
  decorators: [
    (Story) => (
      <Disclosure>
        <Story />
      </Disclosure>
    ),
    withAppProviders,
    withRootLayout,
  ],
};

export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Primary: Story = {
  args: {},
};
