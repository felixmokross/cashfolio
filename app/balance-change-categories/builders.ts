import { createId } from "@paralleldrive/cuid2";
import type { BalanceChangeCategoryDto } from "./types";
import { BalanceChangeType } from "@prisma/client";

export function buildBalanceChangeCategoryDto(
  values: Partial<BalanceChangeCategoryDto> = {}
) {
  return {
    id: createId(),
    name: "Groceries",
    type: BalanceChangeType.EXPENSE,

    createdAt: new Date(2021, 3, 7).toJSON(),
    updatedAt: new Date(2021, 3, 7).toJSON(),

    userId: createId(),

    ...values,
  } as BalanceChangeCategoryDto;
}
