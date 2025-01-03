import type { AssetClass } from "@prisma/client";
import { SerializeFrom } from "~/common/base/utils";

export type AssetClassDto = SerializeFrom<AssetClass>;
