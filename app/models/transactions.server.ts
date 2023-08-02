import type { Transaction, User } from "@prisma/client";
import { BookingType, Prisma } from "@prisma/client";
import { prisma } from "~/prisma.server";

export type TransactionType = "transfer" | "balanceChange" | "valueChange";
export type TransactionDirection = "increase" | "decrease";

export async function createTransaction(form: FormData, userId: User["id"]) {
  const transactionType = form.get("transactionType") as TransactionType;
  const transactionDirection = form.get(
    "transactionDirection"
  ) as TransactionDirection;
  const inputAmount = new Prisma.Decimal(form.get("amount") as string);
  const amount =
    transactionDirection === "increase" ? inputAmount : inputAmount.negated();
  const counterAmount = amount.negated();

  await prisma.transaction.create({
    data: {
      date: new Date(form.get("date") as string),
      note: form.get("note") as string,
      bookings: {
        create: [
          {
            type: BookingType.ACCOUNT_CHANGE,
            amount,
            account: {
              connect: {
                id_userId: { id: form.get("accountId") as string, userId },
              },
            },
            user: { connect: { id: userId } },
          },
          transactionType === "transfer"
            ? {
                type: BookingType.ACCOUNT_CHANGE,
                amount: counterAmount,
                account: {
                  connect: {
                    id_userId: {
                      id: form.get("targetAccountId") as string,
                      userId,
                    },
                  },
                },
                user: { connect: { id: userId } },
              }
            : transactionType === "balanceChange"
            ? {
                type: BookingType.BALANCE_CHANGE,
                amount: counterAmount,
                balanceChangeCategory: {
                  connect: {
                    id_userId: {
                      id: form.get("balanceChangeCategoryId") as string,
                      userId,
                    },
                  },
                },
                user: { connect: { id: userId } },
              }
            : {
                type: BookingType.VALUE_CHANGE,
                amount: counterAmount,
                user: { connect: { id: userId } },
              },
        ],
      },
      userId,
    },
  });
}

export async function deleteTransaction(
  id: Transaction["id"],
  userId: User["id"]
) {
  await prisma.transaction.delete({
    where: { id_userId: { id, userId } },
  });
}
