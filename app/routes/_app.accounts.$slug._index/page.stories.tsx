import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { createId } from "@paralleldrive/cuid2";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { buildAccountDto } from "~/accounts/builders";
import { buildGetReverseLedgerDateGroupsResultDto } from "~/ledgers-lines/builders";

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
    ledgerDateGroups: buildGetReverseLedgerDateGroupsResultDto(),
    targetAccounts: [
      buildAccountDto({ id: createId(), name: "Savings" }),
      buildAccountDto({ id: createId(), name: "Checking" }),
    ],
    balanceChangeCategories: [],
  },
};
