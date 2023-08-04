import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { AccountUnit } from "@prisma/client";
import { buildAccountDto } from "~/accounts/builders";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";

const meta: Meta<typeof Page> = {
  title: "routes/_app/accounts/_index/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    accounts: [
      buildAccountDto({ name: "Cash", slug: "cash" }),
      buildAccountDto({
        name: "Foreign Cash",
        slug: "foreign-cash",
        currency: "EUR",
      }),
      buildAccountDto({
        name: "Stock",
        slug: "stock",
        unit: AccountUnit.STOCK,
        currency: null,
      }),
    ],
  },
};
