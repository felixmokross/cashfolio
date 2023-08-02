import type { Meta, StoryObj } from "@storybook/react";
import type { AccountPageProps } from "./account-page";
import { AccountPage } from "./account-page";
import { createId } from "@paralleldrive/cuid2";
import { BookingType } from "@prisma/client";

const meta: Meta<typeof AccountPage> = {
  title: "routes/accounts/$slug/_index/AccountPage",
  component: AccountPage,
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

type Story = StoryObj<typeof AccountPage>;

const cashAssetClassId = createId();

export const Default: Story = {
  args: {
    account: {
      id: createId(),
      name: "My Account",
      slug: "my-account",
      assetClassId: cashAssetClassId,
      type: "ASSET",
      unit: "CURRENCY",
      isActive: true,
      currency: "USD",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      preExisting: false,
      openingDate: new Date().toISOString(),
      balanceAtStart: null,
      closingDate: null,
      userId: createId(),
    },
    ledgerDateGroups: {
      initialPageBalance: "10_000",
      initialPageBalanceFormatted: "$10,000.00",
      groups: [
        {
          balance: "11_000",
          balanceFormatted: "$11,000.00",
          date: "2021-01-01",
          dateFormatted: "Jan 1, 2021",
          lines: [
            {
              id: createId(),
              amount: "1_000",
              amountFormatted: "$+1,000.00",
              note: "Initial balance",
              balance: "11_000",
              transaction: {
                id: createId(),
                date: "2021-01-01",
                note: "Initial balance",
                bookings: [],
              },
              type: BookingType.ACCOUNT_CHANGE,
            },
          ],
        },
      ],
      page: 0,
      pageCount: 1,
    },
    targetAccounts: [
      {
        id: createId(),
        name: "Savings",
      } as AccountPageProps["targetAccounts"][number],
      {
        id: createId(),
        name: "Checking",
        assetClassId: cashAssetClassId,
      } as AccountPageProps["targetAccounts"][number],
    ],
    balanceChangeCategories: [],
  },
};
