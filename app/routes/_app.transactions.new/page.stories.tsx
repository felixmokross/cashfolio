import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { buildAccountDto } from "~/accounts/builders";
import { buildIncomeCategoryDto } from "~/income-categories/builders";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";

const meta: Meta<typeof Page> = {
  title: "routes/_app/transactions/new/Page",
  component: Page,
  decorators: [withAppProviders, withPageMaxWidth],
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
    incomeCategories: [
      buildIncomeCategoryDto({ name: "Salary" }),
      buildIncomeCategoryDto({ name: "Side Project" }),
    ],
  },
};

export const WithErrors: Story = {
  args: {
    ...Default.args,
    // errors: {
    //   date: "Date is required",
    //   targetAccountId: "Account is required",
    //   balanceChangeCategoryId: "Category is required",
    //   amount: "Amount is required",
    // },
  },
};
