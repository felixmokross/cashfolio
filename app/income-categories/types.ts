import type { IncomeCategory } from "@prisma/client";
import { SerializeFrom } from "~/common/base/utils";

export type IncomeCategoryDto = SerializeFrom<IncomeCategory>;
