import type { Meta, StoryObj } from "@storybook/react";
import type { NewTransactionFormProps } from "./new-transaction-form";
import { NewTransactionForm } from "./new-transaction-form";
import { createId } from "@paralleldrive/cuid2";

const meta: Meta<typeof NewTransactionForm> = {
  title: "routes/accounts/$slug/_index/NewTransactionForm",
  component: NewTransactionForm,
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

type Story = StoryObj<typeof NewTransactionForm>;

const cashAssetClassId = createId();

export const Default: Story = {
  args: {
    account: {
      id: createId(),
      currency: "CHF",
    } as NewTransactionFormProps["account"],
    targetAccounts: [
      {
        id: createId(),
        name: "Savings",
      } as NewTransactionFormProps["targetAccounts"][number],
      {
        id: createId(),
        name: "Checking",
        assetClassId: cashAssetClassId,
      } as NewTransactionFormProps["targetAccounts"][number],
    ],
    balanceChangeCategories: [],
  },
};
