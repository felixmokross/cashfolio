import type { Meta, StoryObj } from "@storybook/react";
import { MainMenu } from "./main-menu";
import { Disclosure } from "@headlessui/react";

const meta: Meta<typeof MainMenu> = {
  title: "MainMenu",
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
  args: {
    user: {
      email: "user@example.com",
      pictureUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      preferredLocale: "en-US",
      refCurrency: "USD",
    },
  },
};
