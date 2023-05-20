import type { Meta, StoryObj } from "@storybook/react";
import { AccountListPage } from "./account-list-page";
import type { SerializeFrom } from "@remix-run/node";
import type { Account } from "@prisma/client";
import { AccountUnit } from "@prisma/client";

const meta: Meta<typeof AccountListPage> = {
  title: "routes/accounts/_index/AccountListPage",
  component: AccountListPage,
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

type Story = StoryObj<typeof AccountListPage>;

export const Default: Story = {
  args: {
    accounts: [
      {
        name: "Cash",
        slug: "cash",
        unit: AccountUnit.CURRENCY,
        currency: "CHF",
      },
      {
        name: "Foreign Cash",
        slug: "foreign-cash",
        unit: AccountUnit.CURRENCY,
        currency: "EUR",
      },
      {
        name: "Stock",
        slug: "stock",
        unit: AccountUnit.STOCK,
        currency: null,
      },
    ] as SerializeFrom<Account>[],
  },
};
