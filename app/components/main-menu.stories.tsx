import type { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "./main-menu";
import { Disclosure } from "@headlessui/react";

const meta: Meta<typeof MainMenu> = {
  title: "components/MainMenu",
  component: MainMenu,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Disclosure>
        <Story />
      </Disclosure>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MainMenu>;

export const Primary: Story = {
  args: {},
};
