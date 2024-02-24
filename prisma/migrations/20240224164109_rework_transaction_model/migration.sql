/*
  Warnings:

  - The values [ACCOUNT_CHANGE,BALANCE_CHANGE,VALUE_CHANGE] on the enum `BookingType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `balanceChangeCategoryId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `BalanceChangeCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingType_new" AS ENUM ('CHARGE', 'DEPOSIT', 'INCOME', 'EXPENSE');
ALTER TABLE "Booking" ALTER COLUMN "type" TYPE "BookingType_new" USING ("type"::text::"BookingType_new");
ALTER TYPE "BookingType" RENAME TO "BookingType_old";
ALTER TYPE "BookingType_new" RENAME TO "BookingType";
DROP TYPE "BookingType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "BalanceChangeCategory" DROP CONSTRAINT "BalanceChangeCategory_userId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_balanceChangeCategoryId_userId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "balanceChangeCategoryId",
ADD COLUMN     "expenseCategoryId" TEXT,
ADD COLUMN     "incomeCategoryId" TEXT;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date";

-- DropTable
DROP TABLE "BalanceChangeCategory";

-- DropEnum
DROP TYPE "BalanceChangeType";

-- CreateTable
CREATE TABLE "IncomeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "IncomeCategory_pkey" PRIMARY KEY ("id","userId")
);

-- CreateTable
CREATE TABLE "ExpenseCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id","userId")
);

-- AddForeignKey
ALTER TABLE "IncomeCategory" ADD CONSTRAINT "IncomeCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_incomeCategoryId_userId_fkey" FOREIGN KEY ("incomeCategoryId", "userId") REFERENCES "IncomeCategory"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_expenseCategoryId_userId_fkey" FOREIGN KEY ("expenseCategoryId", "userId") REFERENCES "ExpenseCategory"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;
