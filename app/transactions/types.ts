import type { Booking, Transaction } from "@prisma/client";
import type { SerializeFrom } from "@remix-run/node";

export type TransactionDto = SerializeFrom<Transaction>;
export type BookingDto = SerializeFrom<Booking>;
