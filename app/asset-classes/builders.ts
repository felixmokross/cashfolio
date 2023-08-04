import { createId } from "@paralleldrive/cuid2";
import type { AssetClassDto } from "./types";

export function buildAssetClassDto(values: Partial<AssetClassDto>) {
  return {
    id: createId(),
    name: "Cash",
    sortOrder: 10,

    createdAt: new Date(2021, 3, 7).toJSON(),
    updatedAt: new Date(2021, 3, 7).toJSON(),

    userId: createId(),
    ...values,
  } as AssetClassDto;
}
