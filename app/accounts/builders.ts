import { createId } from "@paralleldrive/cuid2";
import type { AccountDto } from "./types";
import { AccountType, AccountUnit } from "@prisma/client";

export function buildAccountDto(values: Partial<AccountDto> = {}) {
  return {
    id: createId(),
    name: "Test Account",
    slug: "test-account",
    type: AccountType.ASSET,
    assetClassId: createId(),
    unit: AccountUnit.CURRENCY,
    currency: "CHF",
    preExisting: true,
    balanceAtStart: 10_000,
    openingDate: null,
    closingDate: null,
    isActive: true,
    createdAt: new Date(2021, 3, 7),
    updatedAt: new Date(2021, 3, 7),
    userId: createId(),
    ...values,
  } as AccountDto;
}
