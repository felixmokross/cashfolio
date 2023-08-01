/*
  Warnings:

  - The values [CHARGE,DEPOSIT,INCOME,EXPENSE,APPRECIATION,DEPRECIATION] on the enum `BookingType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `incomeExpenseCategoryId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `IncomeExpenseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "BalanceChangeType" AS ENUM ('INCOME', 'EXPENSE');

-- AlterEnum
BEGIN;
CREATE TYPE "BookingType_new" AS ENUM ('TRANSFER', 'BALANCE_CHANGE', 'VALUE_CHANGE');
ALTER TABLE "Booking" ALTER COLUMN "type" TYPE "BookingType_new" USING ("type"::text::"BookingType_new");
ALTER TYPE "BookingType" RENAME TO "BookingType_old";
ALTER TYPE "BookingType_new" RENAME TO "BookingType";
DROP TYPE "BookingType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_incomeExpenseCategoryId_userId_fkey";

-- DropForeignKey
ALTER TABLE "IncomeExpenseCategory" DROP CONSTRAINT "IncomeExpenseCategory_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "incomeExpenseCategoryId",
ADD COLUMN     "balanceChangeCategoryId" TEXT;

-- DropTable
DROP TABLE "IncomeExpenseCategory";

-- DropEnum
DROP TYPE "IncomeExpenseCategoryType";

-- CreateTable
CREATE TABLE "BalanceChangeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "BalanceChangeType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BalanceChangeCategory_pkey" PRIMARY KEY ("id","userId")
);

-- AddForeignKey
ALTER TABLE "BalanceChangeCategory" ADD CONSTRAINT "BalanceChangeCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_balanceChangeCategoryId_userId_fkey" FOREIGN KEY ("balanceChangeCategoryId", "userId") REFERENCES "BalanceChangeCategory"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
