import type { Meta, StoryObj } from "@storybook/react";
import { AccountCard } from "./account-card";
import { AccountUnit } from "@prisma/client";

const meta: Meta<typeof AccountCard> = {
  title: "routes/accounts/AccountCard",
  component: AccountCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-xs">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AccountCard>;

export const Default: Story = {
  args: {
    account: {
      name: "Cash",
      slug: "cash",
      unit: AccountUnit.CURRENCY,
      currency: "CHF",
    },
    balance: "10000",
    balanceInRefCurrency: "10000",
  },
};

export const ForeignCurrency: Story = {
  args: {
    account: {
      name: "Foreign Cash",
      slug: "foreign-cash",
      unit: AccountUnit.CURRENCY,
      currency: "EUR",
    },
    balance: "10000",
    balanceInRefCurrency: "11000",
  },
};

export const Stock: Story = {
  args: {
    account: {
      name: "Stock",
      slug: "stock",
      unit: AccountUnit.STOCK,
      currency: null,
    },
    balance: "1240",
    balanceInRefCurrency: "14000",
  },
};

export const LongContent: Story = {
  args: {
    account: {
      name: "This is a Long Account Name",
      slug: "long-account",
      unit: AccountUnit.CURRENCY,
      currency: "USD",
    },
    balance: "10000",
    balanceInRefCurrency: "11000",
  },
};
