import type { User } from "@prisma/client";
import { BookingType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { prisma } from "~/prisma.server";

export type TransactionType = "transfer" | "balanceChange" | "valueChange";
export type TransactionDirection = "increase" | "decrease";

export async function createTransaction(form: FormData, userId: User["id"]) {
  const transactionType = form.get("transactionType") as TransactionType;
  const transactionDirection = form.get(
    "transactionDirection"
  ) as TransactionDirection;
  const inputAmount = new Decimal(form.get("amount") as string);
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
