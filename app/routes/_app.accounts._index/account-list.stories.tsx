import type { Meta, StoryObj } from "@storybook/react";
import { AccountList } from "./account-list";
import { AccountUnit } from "@prisma/client";

const meta: Meta<typeof AccountList> = {
  title: "routes/accounts/AccountList",
  component: AccountList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-screen-sm">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AccountList>;

export const Default: Story = {
  args: {
    accounts: [
      {
        account: {
          name: "Cash",
          slug: "cash",
          unit: AccountUnit.CURRENCY,
          currency: "CHF",
        },
        balance: "10000",
        balanceInRefCurrency: "10000",
      },
      {
        account: {
          name: "Foreign Cash",
          slug: "foreign-cash",
          unit: AccountUnit.CURRENCY,
          currency: "EUR",
        },
        balance: "10000",
        balanceInRefCurrency: "11000",
      },
      {
        account: {
          name: "Stock",
          slug: "stock",
          unit: AccountUnit.STOCK,
          currency: null,
        },
        balance: "1240",
        balanceInRefCurrency: "14000",
      },
    ],
  },
};
