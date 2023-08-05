import type { BalanceChangeCategory } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type BalanceChangeCategoryDto = SerializeFrom<BalanceChangeCategory>;
