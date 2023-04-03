import type { User } from "@prisma/client";
import { prisma } from "~/prisma.server";

export async function getUserIdByAuth0UserId(auth0UserId: User["auth0UserId"]) {
  return (
    await prisma.user.findUnique({
      where: { auth0UserId },
      select: { id: true },
    })
  )?.id;
}

export async function createUser({
  auth0UserId,
  preferredLocale,
  refCurrency,
}: Pick<User, "auth0UserId" | "preferredLocale" | "refCurrency">) {
  return prisma.user.create({
    data: {
      auth0UserId,
      preferredLocale,
      refCurrency,
    },
  });
}
