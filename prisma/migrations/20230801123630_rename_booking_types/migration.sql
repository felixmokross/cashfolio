/*
  Warnings:

  - The values [TRANSFER] on the enum `BookingType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingType_new" AS ENUM ('ACCOUNT_CHANGE', 'BALANCE_CHANGE', 'VALUE_CHANGE');
ALTER TABLE "Booking" ALTER COLUMN "type" TYPE "BookingType_new" USING ("type"::text::"BookingType_new");
ALTER TYPE "BookingType" RENAME TO "BookingType_old";
ALTER TYPE "BookingType_new" RENAME TO "BookingType";
DROP TYPE "BookingType_old";
COMMIT;
