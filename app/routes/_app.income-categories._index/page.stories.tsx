import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";
import { buildIncomeCategoryDto } from "~/income-categories/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/income-categories/_index/Page",
  component: Page,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    incomeCategories: [
      buildIncomeCategoryDto({ name: "Side Project" }),
      buildIncomeCategoryDto({ name: "Salary" }),
      buildIncomeCategoryDto({ name: "Interest" }),
    ],
  },
};
