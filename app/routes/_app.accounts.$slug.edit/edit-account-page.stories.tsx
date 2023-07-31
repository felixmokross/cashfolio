import type { Meta, StoryObj } from "@storybook/react";
import { EditAccountPage } from "./edit-account-page";
import { createId } from "@paralleldrive/cuid2";
import type { SerializeFrom } from "@remix-run/node";
import type { AssetClass } from "@prisma/client";

const meta: Meta<typeof EditAccountPage> = {
  title: "routes/accounts/$slug/edit/EditAccountPage",
  component: EditAccountPage,
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

type Story = StoryObj<typeof EditAccountPage>;

const cashAssetClassId = createId();

export const Default: Story = {
  args: {
    data: {
      assetClasses: [
        { id: cashAssetClassId, name: "Cash" } as SerializeFrom<AssetClass>,
        { id: createId(), name: "Equity" } as SerializeFrom<AssetClass>,
      ],
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
  },
};
