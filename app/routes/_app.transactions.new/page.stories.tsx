import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { buildAccountDto } from "~/accounts/builders";
import { buildBalanceChangeCategoryDto } from "~/balance-change-categories/builders";
import { BalanceChangeType } from "@prisma/client";

const meta: Meta<typeof Page> = {
  title: "routes/_app/transactions/new/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

const currentAcconut = buildAccountDto({ name: "Current Account" });

export const Default: Story = {
  args: {
    account: currentAcconut,
    accounts: [
      currentAcconut,
      buildAccountDto({ name: "Checking" }),
      buildAccountDto({ name: "Savings" }),
    ],
    balanceChangeCategories: [
      buildBalanceChangeCategoryDto({
        name: "Groceries",
        type: BalanceChangeType.EXPENSE,
      }),
      buildBalanceChangeCategoryDto({
        name: "Car",
        type: BalanceChangeType.EXPENSE,
      }),
      buildBalanceChangeCategoryDto({
        name: "Health",
        type: BalanceChangeType.EXPENSE,
      }),
      buildBalanceChangeCategoryDto({
        name: "Salary",
        type: BalanceChangeType.INCOME,
      }),
      buildBalanceChangeCategoryDto({
        name: "Side Project",
        type: BalanceChangeType.INCOME,
      }),
    ],
  },
};

export const WithErrors: Story = {
  args: {
    ...Default.args,
    errors: {
      date: "Date is required",
      targetAccountId: "Account is required",
      balanceChangeCategoryId: "Category is required",
      amount: "Amount is required",
    },
  },
};
