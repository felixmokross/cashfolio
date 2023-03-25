import type { User } from "@prisma/client";
import { prisma } from "~/prisma.server";

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  email: User["email"],
  //   refCurrency: string,
  preferredLocale?: string
) {
  return prisma.user.create({
    data: {
      email,
      //   refCurrency,
      preferredLocale,
    },
  });
}
