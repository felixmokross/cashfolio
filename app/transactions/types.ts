import type { Booking, Transaction } from "@prisma/client";
import type { SerializeFrom } from "react-router";

export type TransactionDto = SerializeFrom<Transaction>;
export type BookingDto = SerializeFrom<Booking>;
