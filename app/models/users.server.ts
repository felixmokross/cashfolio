import type { User } from "@prisma/client";
import { prisma } from "~/prisma.server";

export async function getUserByAuth0UserId(auth0UserId: User["auth0UserId"]) {
  return prisma.user.findUnique({ where: { auth0UserId } });
}

export async function createUser({
  auth0UserId,
  preferredLocale,
}: Pick<User, "auth0UserId" | "preferredLocale">) {
  return prisma.user.create({
    data: {
      auth0UserId,
      preferredLocale,
    },
  });
}
