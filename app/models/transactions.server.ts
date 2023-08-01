import type { User } from "@prisma/client";
import { BookingType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { prisma } from "~/prisma.server";

export async function createTransaction(form: FormData, userId: User["id"]) {
  const bookingType = form.get("bookingType") as BookingType;
  const amount = new Decimal(form.get("amount") as string);

  await prisma.transaction.create({
    data: {
      date: new Date(form.get("date") as string),
      bookings: {
        create: [
          {
            type: BookingType.TRANSFER,
            amount: amount.negated(),
            account: {
              connect: {
                id_userId: { id: form.get("accountId") as string, userId },
              },
            },
            user: { connect: { id: userId } },
          },
          {
            type: bookingType,
            amount,
            account:
              bookingType === BookingType.TRANSFER
                ? {
                    connect: {
                      id_userId: {
                        id: form.get("targetAccountId") as string,
                        userId,
                      },
                    },
                  }
                : undefined,
            balanceChangeCategory:
              bookingType === BookingType.BALANCE_CHANGE
                ? {
                    connect: {
                      id_userId: {
                        id: form.get("balanceChangeCategoryId") as string,
                        userId,
                      },
                    },
                  }
                : undefined,
            user: { connect: { id: userId } },
          },
        ],
      },
      note: form.get("note") as string,
      userId,
    },
  });
}
