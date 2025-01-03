import type { IncomeCategory } from "@prisma/client";
import type { SerializeFrom } from "react-router";

export type IncomeCategoryDto = SerializeFrom<IncomeCategory>;
