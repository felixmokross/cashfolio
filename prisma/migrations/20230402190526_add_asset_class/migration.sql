-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "assetClassId" TEXT;

-- CreateTable
CREATE TABLE "AssetClass" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AssetClass_pkey" PRIMARY KEY ("id","userId")
);

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_assetClassId_userId_fkey" FOREIGN KEY ("assetClassId", "userId") REFERENCES "AssetClass"("id", "userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetClass" ADD CONSTRAINT "AssetClass_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
