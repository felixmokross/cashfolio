import type { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "./main-menu";
import { Disclosure } from "@headlessui/react";
import { buildExtendedUserDto } from "~/users/builders";
import { withAppProviders, withPageMaxWidth } from "./storybook";

const meta: Meta<typeof MainMenu> = {
  title: "components/MainMenu",
  component: MainMenu,
  decorators: [
    (Story) => (
      <Disclosure>
        <Story />
      </Disclosure>
    ),
    withPageMaxWidth,
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
