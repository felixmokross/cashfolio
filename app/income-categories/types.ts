import type { IncomeCategory } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type IncomeCategoryDto = SerializeFrom<IncomeCategory>;
