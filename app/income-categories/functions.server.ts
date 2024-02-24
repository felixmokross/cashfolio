import type { IncomeCategory } from "@prisma/client";
import { prisma } from "~/common/prisma.server";

export async function getIncomeCategories(userId: IncomeCategory["userId"]) {
  return await prisma.incomeCategory.findMany({
    where: { userId },
  });
}

export async function createIncomeCategory(
  userId: IncomeCategory["userId"],
  { name }: Pick<IncomeCategory, "name">,
) {
  name = name.trim();

  return await prisma.incomeCategory.create({
    data: {
      name,
      userId,
    },
  });
}
