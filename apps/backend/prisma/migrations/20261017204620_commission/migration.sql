/*
  Warnings:

  - You are about to drop the column `commissionType` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `commissionValue` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "commissionType",
DROP COLUMN "commissionValue",
ADD COLUMN     "commission" INTEGER NOT NULL DEFAULT 0;
