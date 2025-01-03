import type { Account, User } from "@prisma/client";
import { BookingType, Prisma } from "@prisma/client";
// import { cache } from "~/cache.server";
// import { prisma } from "~/db.server";
// import { formatDate, formatMoney } from "~/formatting.server";
import type { getAccount } from "../accounts/functions.server";
import { prisma } from "~/common/prisma.server";
import { formatDate, formatMoney } from "~/common/formatting.server";

const pageSize = 100;

export async function getReverseLedgerDateGroups({
  account,
  userId,
  page,
}: {
  account: Account;
  userId: User["id"];
  page: number;
}) {
  // let ledgerLines = cache.ledgerLines.read(userId, account.id);

  // if (!ledgerLines) {
  let ledgerLines = await getLedgerLines({ account, userId });

  // cache.ledgerLines.write(userId, account.id, ledgerLines);
  // }

  ledgerLines = ledgerLines.slice().reverse();
  const pageCount = Math.max(Math.ceil(ledgerLines.length / pageSize), 1);

  const pageOffset = pageSize * page;
  const nextPageOffset = pageOffset + pageSize;
  const pagedLedgerLines = ledgerLines.slice(pageOffset, nextPageOffset);
  const isLastPage = page === pageCount - 1;
  const initialPageBalance = isLastPage
    ? account.preExisting && account.balanceAtStart
      ? account.balanceAtStart
      : new Prisma.Decimal(0)
    : ledgerLines[nextPageOffset].balance;

  const { preferredLocale } = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { preferredLocale: true },
  });

  const groupByDate = new Map<number, LedgerDateGroup>();

  for (const line of pagedLedgerLines) {
    const dateKey = line.date.valueOf();

    if (!groupByDate.has(dateKey)) {
      groupByDate.set(dateKey, {
        date: line.date,
        lines: [line],
        balance: line.balance,
      });
    } else {
      groupByDate.get(dateKey)!.lines.push(line);
    }
  }

  return {
    page,
    pageCount,
    initialPageBalance,
    initialPageBalanceFormatted: formatMoney(
      initialPageBalance,
      account.currency,
      preferredLocale,
    ),
    groups: Array.from(groupByDate.values()).map((group) => ({
      ...group,
      dateFormatted: formatDate(group.date, preferredLocale),
      lines: group.lines.map((line) => ({
        ...line,
        amountFormatted: formatMoney(
          line.amount,
          account.currency,
          preferredLocale,
          "sign-always",
        ),
      })),
      balanceFormatted: formatMoney(
        group.balance,
        account.currency,
        preferredLocale,
      ),
    })),
  };
}

export type LedgerDateGroup = {
  date: Date;
  lines: LedgerLine[];
  balance: Prisma.Decimal;
};

export async function getLedgerLines({
  account,
  userId,
}: {
  account: NonNullable<Awaited<ReturnType<typeof getAccount>>>;
  userId: User["id"];
}) {
  const bookings = await getBookings({ accountId: account.id, userId });

  let balance = new Prisma.Decimal(
    (account.preExisting && account.balanceAtStart) || 0,
  );
  const lines = [];

  for (const booking of bookings) {
    balance = balance.plus(booking.amount);
    lines.push({ ...booking, balance });
  }

  return lines;
}

export type LedgerLine = Booking & {
  balance: Prisma.Decimal;
};

export type Booking = Awaited<ReturnType<typeof getBookings>>[number];

async function getBookings({
  accountId,
  userId,
}: {
  accountId: Account["id"];
  userId: User["id"];
}) {
  return await prisma.booking.findMany({
    where: {
      type: { in: [BookingType.DEPOSIT, BookingType.CHARGE] },
      accountId,
      userId,
    },
    select: {
      id: true,
      date: true,
      type: true,
      transaction: {
        select: {
          id: true,
          note: true,
          bookings: {
            select: {
              id: true,
              type: true,
              account: { select: { id: true, name: true, slug: true } },
              incomeCategory: { select: { id: true, name: true } },
              expenseCategory: { select: { id: true, name: true } },
              note: true,
            },
          },
        },
      },
      note: true,
      amount: true,
    },
    orderBy: [{ date: "asc" }, { transaction: { createdAt: "asc" } }],
  });
}
