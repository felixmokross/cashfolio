import type { Meta, StoryObj } from "@storybook/react";
import { AccountList } from "./account-list";
import { AccountUnit } from "@prisma/client";
import { buildAccountDto } from "~/accounts/builders";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";

const meta: Meta<typeof AccountList> = {
  title: "routes/_app/accounts/_index/AccountList",
  component: AccountList,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof AccountList>;

export const Default: Story = {
  args: {
    accounts: [
      {
        account: buildAccountDto({ name: "Cash", slug: "cash" }),
        balance: "10000",
        balanceInRefCurrency: "10000",
      },
      {
        account: buildAccountDto({
          name: "Foreign Cash",
          slug: "foreign-cash",
          currency: "EUR",
        }),
        balance: "10000",
        balanceInRefCurrency: "11000",
      },
      {
        account: buildAccountDto({
          name: "Stock",
          slug: "stock",
          unit: AccountUnit.STOCK,
          currency: null,
        }),
        balance: "1240",
        balanceInRefCurrency: "14000",
      },
    ],
  },
};
