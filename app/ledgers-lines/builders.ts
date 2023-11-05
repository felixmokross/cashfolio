import { createId } from "@paralleldrive/cuid2";
import type {
  GetReverseLedgerDateGroupsResultDto,
  LedgerDateGroupDto,
  LedgerLineBookingDto,
  LedgerLineDto,
  LedgerLineTransactionDto,
} from "./types";
import { BookingType } from "@prisma/client";
import { buildBookingDto, buildTransactionDto } from "~/transactions/builders";
import { buildAccountDto } from "~/accounts/builders";

export function buildGetReverseLedgerDateGroupsResultDto(
  values: Partial<GetReverseLedgerDateGroupsResultDto> = {},
) {
  return {
    initialPageBalance: "10000",
    initialPageBalanceFormatted: "10,000.00",
    groups: [
      buildLedgerDateGroupDto(),
      buildLedgerDateGroupDto(),
      buildLedgerDateGroupDto(),
    ],
    page: 0,
    pageCount: 1,
    ...values,
  } as GetReverseLedgerDateGroupsResultDto;
}

export function buildLedgerDateGroupDto(
  values: Partial<LedgerDateGroupDto> = {},
) {
  return {
    date: new Date().toJSON(),
    lines: [buildLedgerLineDto(), buildLedgerLineDto(), buildLedgerLineDto()],
    balance: "3000",
    balanceFormatted: "3,000.00",
    ...values,
  } as LedgerDateGroupDto;
}

export function buildLedgerLineDto(values: Partial<LedgerLineDto> = {}) {
  return {
    id: createId(),
    type: BookingType.ACCOUNT_CHANGE,
    transaction: buildLedgerLineTransactionDto(),
    amount: "1000",
    amountFormatted: "1,000.00",
    balance: "1000",
    userId: createId(),
    ...values,
  } as LedgerLineDto;
}

export function buildLedgerLineTransactionDto(
  values: Partial<LedgerLineTransactionDto> = {},
) {
  return {
    ...buildTransactionDto(),
    bookings: [buildLedgerLineBookingDto(), buildLedgerLineBookingDto()],
    ...values,
  } as LedgerLineTransactionDto;
}

export function buildLedgerLineBookingDto(
  values: Partial<LedgerLineBookingDto> = {},
) {
  return {
    ...buildBookingDto(),
    account: buildAccountDto(),
    ...values,
  } as LedgerLineBookingDto;
}
