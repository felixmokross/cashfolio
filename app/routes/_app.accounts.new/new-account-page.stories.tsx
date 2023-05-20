import type { Meta, StoryObj } from "@storybook/react";
import { NewAccountPage } from "./new-account-page";
import { createId } from "@paralleldrive/cuid2";
import type { SerializeFrom } from "@remix-run/node";
import type { AssetClass } from "@prisma/client";

const meta: Meta<typeof NewAccountPage> = {
  title: "routes/accounts/new/NewAccountPage",
  component: NewAccountPage,
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

type Story = StoryObj<typeof NewAccountPage>;

const cashAssetClassId = createId();

export const Default: Story = {
  args: {
    data: {
      assetClasses: [
        { id: cashAssetClassId, name: "Cash" } as SerializeFrom<AssetClass>,
        { id: createId(), name: "Equity" } as SerializeFrom<AssetClass>,
      ],
    },
  },
};
