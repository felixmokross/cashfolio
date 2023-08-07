import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { createId } from "@paralleldrive/cuid2";
import { buildAccountDto } from "~/accounts/builders";
import { buildGetReverseLedgerDateGroupsResultDto } from "~/ledgers-lines/builders";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";

const meta: Meta<typeof Page> = {
  title: "routes/_app/accounts/$slug/_index/Page",
  component: Page,
  decorators: [withAppProviders, withPageMaxWidth],
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
