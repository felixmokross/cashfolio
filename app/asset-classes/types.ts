import type { AssetClass } from "@prisma/client";
import type { SerializeFrom } from "react-router";

export type AssetClassDto = SerializeFrom<AssetClass>;
