import type { Meta, StoryObj } from "@storybook/react";
import { withAppProviders, withPageMaxWidth } from "~/common/storybook";
import { Page } from "./page";
import { buildAssetClassDto } from "~/asset-classes/builders";

const meta: Meta<typeof Page> = {
  title: "routes/_app/asset-classes/$id/Page",
  component: Page,
  decorators: [withPageMaxWidth, withAppProviders],
};

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  args: {
    assetClass: buildAssetClassDto({ name: "Cash" }),
  },
};
