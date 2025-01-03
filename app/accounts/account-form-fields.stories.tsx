import type { Meta, StoryObj } from "@storybook/react";
import type { AssetClass } from "@prisma/client";
import type { SerializeFrom } from "react-router";
import { createId } from "@paralleldrive/cuid2";
import { formatISO } from "date-fns";
import { AccountFormFields } from "./account-form-fields";
import {
  withAppProviders,
  withFormGrid,
  withPageMaxWidth,
} from "~/common/storybook";

const meta: Meta<typeof AccountFormFields> = {
  title: "components/AccountFormFields",
  component: AccountFormFields,
  decorators: [withFormGrid, withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof AccountFormFields>;

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
        createdAt: formatISO(new Date(), { representation: "date" }),
        updatedAt: formatISO(new Date(), { representation: "date" }),
        preExisting: false,
        openingDate: formatISO(new Date(2023, 7, 5), {
          representation: "date",
        }),
        balanceAtStart: null,
        closingDate: null,
        userId: createId(),
      },
    },
  },
};

export const Empty: Story = {
  args: {
    data: {
      ...Default.args!.data!,
      account: undefined,
    },
  },
};

export const WithErrors: Story = {
  args: {
    ...Default.args,
    errors: {
      name: "Name is required",
      openingDate: "Opening date is required",
    },
  },
};

export const WithValues: Story = {
  args: {
    ...Default.args,
    values: {
      name: "Updated Account Name",
      assetClassId: cashAssetClassId,
      balanceAtStart: null,
      currency: "CHF",
      openingDate: formatISO(new Date(2023, 7, 5), { representation: "date" }),
      type: "LIABILITY",
      unit: "STOCK",
      preExisting: "on",
    },
  },
};
