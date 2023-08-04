import type { Meta, StoryObj } from "@storybook/react";
import { AccountCard } from "./account-card";
import { AccountUnit } from "@prisma/client";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { buildAccountDto } from "~/accounts/builders";

const meta: Meta<typeof AccountCard> = {
  title: "routes/_app/accounts/_index/AccountCard",
  component: AccountCard,
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
    withAppProviders,
  ],
  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof AccountCard>;

export const Default: Story = {
  args: {
    account: buildAccountDto({ name: "Cash", slug: "cash" }),
    balance: "10000",
    balanceInRefCurrency: "10000",
  },
};

export const ForeignCurrency: Story = {
  args: {
    account: buildAccountDto({
      name: "Foreign Cash",
      slug: "foreign-cash",
      currency: "EUR",
    }),
    balance: "10000",
    balanceInRefCurrency: "11000",
  },
};

export const Stock: Story = {
  args: {
    account: buildAccountDto({
      name: "Stock",
      slug: "stock",
      unit: AccountUnit.STOCK,
      currency: null,
    }),
    balance: "1240",
    balanceInRefCurrency: "14000",
  },
};

export const LongContent: Story = {
  args: {
    account: buildAccountDto({
      name: "This is a Long Account Name",
      slug: "long-account",
      unit: AccountUnit.CURRENCY,
      currency: "USD",
    }),
    balance: "10000",
    balanceInRefCurrency: "11000",
  },
};
