/*
  Warnings:

  - Made the column `storeId` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_storeId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "commission" INTEGER NOT NULL DEFAULT 10,
ALTER COLUMN "storeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
