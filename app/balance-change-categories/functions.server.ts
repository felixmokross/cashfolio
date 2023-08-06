import type { BalanceChangeCategory } from "@prisma/client";
import { prisma } from "~/common/prisma.server";

export async function getBalanceChangeCategories(
  userId: BalanceChangeCategory["userId"]
) {
  return await prisma.balanceChangeCategory.findMany({
    where: { userId },
  });
}

export async function createBalanceChangeCategory(
  userId: BalanceChangeCategory["userId"],
  { name, type }: Pick<BalanceChangeCategory, "name" | "type">
) {
  name = name.trim();

  return await prisma.balanceChangeCategory.create({
    data: {
      name,
      type,
      userId,
    },
  });
}
