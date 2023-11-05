import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./page";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";
import { buildAssetClassDto } from "~/asset-classes/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/asset-classes/_index/Page",
  component: Page,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    assetClasses: [
      buildAssetClassDto({ name: "Cash" }),
      buildAssetClassDto({ name: "Receivable" }),
      buildAssetClassDto({ name: "Equity" }),
      buildAssetClassDto({ name: "Pension" }),
    ],
  },
};
