import type { Meta, StoryObj } from "@storybook/react";
import { AccountPage } from "./account-page";
import { createId } from "@paralleldrive/cuid2";

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
  },
};
