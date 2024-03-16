import { createId } from "@paralleldrive/cuid2";
import type { BookingDto, TransactionDto } from "./types";
import { BookingType } from "@prisma/client";

export function buildTransactionDto(values: Partial<TransactionDto> = {}) {
  return {
    id: createId(),
    date: new Date().toJSON(),

    bookings: [buildBookingDto(), buildBookingDto()],

    createdAt: new Date().toJSON(),
    updatedAt: new Date().toJSON(),

    userId: createId(),

    ...values,
  } as TransactionDto;
}

export function buildBookingDto(values: Partial<BookingDto> = {}) {
  return {
    id: createId(),
    type: BookingType.CHARGE,
    accountId: createId(),

    transactionId: createId(),

    amount: "1000",

    userId: createId(),

    ...values,
  } as BookingDto;
}
