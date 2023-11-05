import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./calendar";
import { CalendarDate } from "@internationalized/date";
import { withAppProviders } from "~/common/storybook";

const meta: Meta<typeof Calendar> = {
  title: "base/forms/Calendar",
  component: Calendar,
  decorators: [withAppProviders],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    value: new CalendarDate(2023, 3, 1),
  },
};
