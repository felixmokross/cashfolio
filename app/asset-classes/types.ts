import type { AssetClass } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type AssetClassDto = SerializeFrom<AssetClass>;
