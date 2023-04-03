import type { Account } from "@prisma/client";
import slugify from "slugify";
import { prisma } from "~/prisma.server";

export async function getAccounts(userId: Account["userId"]) {
  return await prisma.account.findMany({ where: { userId } });
}

export async function getAccountId(
  slug: Account["slug"],
  userId: Account["userId"]
) {
  return (
    await prisma.account.findUnique({
      where: { slug_userId: { slug, userId } },
      select: { id: true },
    })
  )?.id;
}

export async function getAccount(
  slug: Account["slug"],
  userId: Account["userId"]
) {
  return await prisma.account.findUnique({
    where: { slug_userId: { slug, userId } },
  });
}

export async function createAccount(
  userId: Account["userId"],
  { name }: Pick<Account, "name">
) {
  name = name.trim();

  return await prisma.account.create({
    data: {
      name,
      slug: getAccountSlug(name),
      userId,
    },
  });
}

export async function updateAccount(
  id: Account["id"],
  userId: Account["userId"],
  { name }: Pick<Account, "name">
) {
  name = name.trim();

  return await prisma.account.update({
    where: { id_userId: { id, userId } },
    data: {
      name,
      slug: getAccountSlug(name),
    },
  });
}

function getAccountSlug(name: Account["name"]) {
  return slugify(name, { lower: true });
}
