import type { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "./main-menu";
import { Disclosure } from "@headlessui/react";
import { withRootLayout } from "../../.storybook/decorators/withRootLayout";
import { withAppProviders } from "../../.storybook/decorators/withAppProviders";
import { buildExtendedUserDto } from "~/users/builders";

const meta: Meta<typeof MainMenu> = {
  title: "components/MainMenu",
  component: MainMenu,
  decorators: [
    (Story) => (
      <Disclosure>
        <Story />
      </Disclosure>
    ),
    withRootLayout,
    withAppProviders,
  ],
};

export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Primary: Story = {
  args: {
    user: buildExtendedUserDto(),
  },
};
