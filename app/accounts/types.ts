import type { Account } from "@prisma/client";
import type { getAccount } from "~/accounts/functions.server";
import type { getAssetClasses } from "~/asset-classes/functions.server";
import { SerializeFrom } from "~/common/base/utils";

export type AccountDto = SerializeFrom<Account>;

export type AccountFormLoaderData = {
  assetClasses: Awaited<ReturnType<typeof getAssetClasses>>;
  account?: NonNullable<Awaited<ReturnType<typeof getAccount>>>;
};
