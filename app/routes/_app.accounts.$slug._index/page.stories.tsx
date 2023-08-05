import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { createId } from "@paralleldrive/cuid2";
import { BookingType } from "@prisma/client";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { buildAccountDto } from "~/accounts/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/accounts/$slug/_index/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    account: buildAccountDto({ name: "My Account" }),
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
      buildAccountDto({ id: createId(), name: "Savings" }),
      buildAccountDto({ id: createId(), name: "Checking" }),
    ],
    balanceChangeCategories: [],
  },
};
