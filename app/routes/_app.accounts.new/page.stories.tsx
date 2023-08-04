import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { withAppProviders } from "../../../.storybook/decorators/withAppProviders";
import { withRootLayout } from "../../../.storybook/decorators/withRootLayout";
import { buildAssetClassDto } from "~/asset-classes/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/accounts/new/Page",
  component: Page,
  decorators: [withAppProviders, withRootLayout],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    data: {
      assetClasses: [
        buildAssetClassDto({ name: "Cash" }),
        buildAssetClassDto({ name: "Receivable" }),
        buildAssetClassDto({ name: "Equity" }),
        buildAssetClassDto({ name: "Pension" }),
      ],
    },
  },
};
