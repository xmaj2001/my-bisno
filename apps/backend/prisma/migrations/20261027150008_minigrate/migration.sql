/*
  Warnings:

  - You are about to drop the `ProductCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `affiliate_profiles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[whatsapp]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "affiliate_profiles" DROP CONSTRAINT "affiliate_profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productCategoryId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "affiliateStatus" "AffiliateStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "payoutAccount" TEXT,
ADD COLUMN     "payoutHolder" TEXT,
ADD COLUMN     "payoutMethod" "PayoutMethod",
ADD COLUMN     "province" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- DropTable
DROP TABLE "ProductCategory";

-- DropTable
DROP TABLE "affiliate_profiles";

-- CreateTable
CREATE TABLE "product_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_categories_name_key" ON "product_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsapp_key" ON "users"("whatsapp");

-- CreateIndex
CREATE INDEX "users_affiliateStatus_idx" ON "users"("affiliateStatus");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
