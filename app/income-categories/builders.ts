import { createId } from "@paralleldrive/cuid2";
import type { IncomeCategoryDto } from "./types";

export function buildIncomeCategoryDto(
  values: Partial<IncomeCategoryDto> = {},
) {
  return {
    id: createId(),
    name: "Salary",

    createdAt: new Date(2021, 3, 7).toJSON(),
    updatedAt: new Date(2021, 3, 7).toJSON(),

    userId: createId(),

    ...values,
  } as IncomeCategoryDto;
}
