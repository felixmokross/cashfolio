import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
import { I18nProvider } from "react-aria";

const meta: Meta<typeof Calendar> = {
  title: "forms/datepicker/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => (
      <I18nProvider locale={context.globals.locale}>
        <Story />
      </I18nProvider>
    ),
    (Story, context) => (
      <div className="flex h-screen items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {},
};
