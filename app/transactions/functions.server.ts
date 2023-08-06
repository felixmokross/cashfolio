import type { Transaction, User } from "@prisma/client";
import { BookingType, Prisma } from "@prisma/client";
import invariant from "tiny-invariant";
import type { FormErrors } from "~/components/forms/types";
import { prisma } from "~/prisma.server";
import { isValidDecimal, parseDecimal } from "~/utils.server";

export type TransactionType = "transfer" | "balanceChange" | "valueChange";
export type TransactionDirection = "increase" | "decrease";

export async function createTransaction(
  values: TransactionValues,
  accountId: string,
  userId: User["id"]
) {
  const inputAmount = new Prisma.Decimal(values.amount as string);
  const amount =
    values.direction === "increase" ? inputAmount : inputAmount.negated();
  const counterAmount = amount.negated();

  await prisma.transaction.create({
    data: {
      date: new Date(values.date as string),
      note: values.note || null,
      bookings: {
        create: [
          {
            type: BookingType.ACCOUNT_CHANGE,
            amount,
            account: {
              connect: {
                id_userId: { id: accountId, userId },
              },
            },
            user: { connect: { id: userId } },
          },
          values.type === "transfer"
            ? {
                type: BookingType.ACCOUNT_CHANGE,
                amount: counterAmount,
                account: {
                  connect: {
                    id_userId: {
                      id: values.targetAccountId!,
                      userId,
                    },
                  },
                },
                user: { connect: { id: userId } },
              }
            : values.type === "balanceChange"
            ? {
                type: BookingType.BALANCE_CHANGE,
                amount: counterAmount,
                balanceChangeCategory: {
                  connect: {
                    id_userId: {
                      id: values.balanceChangeCategoryId!,
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

export async function getTransactionValues(
  request: Request
): Promise<TransactionValues> {
  const formData = await request.formData();
  const date = formData.get("date");
  const type = formData.get("transactionType");
  const direction = formData.get("transactionDirection");
  const targetAccountId = formData.get("targetAccountId");
  const balanceChangeCategoryId = formData.get("balanceChangeCategoryId");
  const note = formData.get("note");
  const amount = formData.get("amount");

  invariant(typeof date === "string", "date not found");
  invariant(typeof type === "string", "type not found");
  invariant(typeof direction === "string", "direction not found");
  invariant(
    !targetAccountId || typeof targetAccountId === "string",
    "targetAccountId not found"
  );
  invariant(
    !balanceChangeCategoryId || typeof balanceChangeCategoryId === "string",
    "balanceChangeCategoryId not found"
  );
  invariant(typeof note === "string", "note not found");
  invariant(typeof amount === "string", "amount not found");

  return {
    date,
    type: type as TransactionType,
    direction: direction as TransactionDirection,
    targetAccountId: targetAccountId || null,
    balanceChangeCategoryId: balanceChangeCategoryId || null,
    note,
    amount,
  };
}

export type TransactionValues = {
  date: string;
  type: TransactionType;
  direction: TransactionDirection;

  targetAccountId: string | null;
  balanceChangeCategoryId: string | null;

  note: string;
  amount: string;
};

export async function validateTransactionValues({
  date,
  type,
  targetAccountId,
  balanceChangeCategoryId,
  amount,
}: TransactionValues) {
  const errors: FormErrors<TransactionValues> = {};

  if (!date) {
    errors.date = "Date is required";
  }

  if (type === "transfer" && !targetAccountId) {
    errors.targetAccountId = "Account is required";
  }

  if (type === "balanceChange" && !balanceChangeCategoryId) {
    errors.balanceChangeCategoryId = "Category is required";
  }

  if (!amount) {
    errors.amount = "Amount is required";
  } else if (!isValidDecimal(amount)) {
    errors.amount = "Amount must be a number";
  } else {
    const parsedAmount = parseDecimal(amount);
    if (parsedAmount.isZero()) {
      errors.amount = "Amount must not be zero";
    } else if (parsedAmount.isNegative()) {
      errors.amount = "Amount must be positive";
    }
  }

  return errors;
}
