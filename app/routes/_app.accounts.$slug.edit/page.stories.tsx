import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { createId } from "@paralleldrive/cuid2";
import { AccountType, AccountUnit } from "@prisma/client";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { buildAssetClassDto } from "~/asset-classes/builders";
import { buildAccountDto } from "~/accounts/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/accounts/$slug/edit/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

const cashAssetClassId = createId();

export const Default: Story = {
  args: {
    data: {
      assetClasses: [
        buildAssetClassDto({ id: cashAssetClassId, name: "Cash" }),
        buildAssetClassDto({ name: "Receivable" }),
        buildAssetClassDto({ name: "Equity" }),
        buildAssetClassDto({ name: "Pension" }),
      ],
      account: buildAccountDto({
        name: "My Account",
        assetClassId: cashAssetClassId,
        type: AccountType.ASSET,
        unit: AccountUnit.CURRENCY,
        currency: "USD",
        preExisting: false,
        openingDate: new Date(2023, 7, 5).toJSON(),
        balanceAtStart: null,
        closingDate: null,
      }),
    },
  },
};
