import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";
import { buildBalanceChangeCategoryDto } from "~/balance-change-categories/builders";
import { BalanceChangeType } from "@prisma/client";

const meta: Meta<typeof Page> = {
  title: "routes/_app/balance-change-categories/_index/Page",
  component: Page,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    balanceChangeCategories: [
      buildBalanceChangeCategoryDto({
        name: "Groceries",
        type: BalanceChangeType.EXPENSE,
      }),
      buildBalanceChangeCategoryDto({
        name: "Living",
        type: BalanceChangeType.EXPENSE,
      }),
      buildBalanceChangeCategoryDto({
        name: "Salary",
        type: BalanceChangeType.INCOME,
      }),
    ],
  },
};
