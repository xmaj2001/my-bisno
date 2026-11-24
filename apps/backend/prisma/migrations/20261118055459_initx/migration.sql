/*
  Warnings:

  - You are about to drop the column `affiliateId` on the `affiliate_products` table. All the data in the column will be lost.
  - You are about to drop the column `badgeText` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `bannerUrl` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `endsAt` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `placement` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `startsAt` on the `featured_products` table. All the data in the column will be lost.
  - You are about to drop the column `commission` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `specs` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the column `affiliateStatus` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `payoutMethod` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `commissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `link_clicks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payouts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_members` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `affiliate_products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `featured_products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `affiliate_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerDesktop` to the `featured_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bannerMobile` to the `featured_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `featured_products` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `featured_products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subtitle` on table `featured_products` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "affiliate_products" DROP CONSTRAINT "affiliate_products_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "commissions" DROP CONSTRAINT "commissions_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "commissions" DROP CONSTRAINT "commissions_orderItemId_fkey";

-- DropForeignKey
ALTER TABLE "commissions" DROP CONSTRAINT "commissions_payoutId_fkey";

-- DropForeignKey
ALTER TABLE "featured_products" DROP CONSTRAINT "featured_products_createdById_fkey";

-- DropForeignKey
ALTER TABLE "link_clicks" DROP CONSTRAINT "link_clicks_affiliateProductId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_affiliateProductId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_productId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_registeredById_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_storeId_fkey";

-- DropForeignKey
ALTER TABLE "payouts" DROP CONSTRAINT "payouts_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "payouts" DROP CONSTRAINT "payouts_paidById_fkey";

-- DropForeignKey
ALTER TABLE "product_images" DROP CONSTRAINT "product_images_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_stats" DROP CONSTRAINT "product_stats_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_productCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_members" DROP CONSTRAINT "store_members_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_members" DROP CONSTRAINT "store_members_userId_fkey";

-- DropIndex
DROP INDEX "affiliate_products_affiliateId_productId_key";

-- DropIndex
DROP INDEX "featured_products_placement_isActive_position_idx";

-- DropIndex
DROP INDEX "featured_products_productId_placement_key";

-- DropIndex
DROP INDEX "products_status_idx";

-- DropIndex
DROP INDEX "products_status_publishedAt_id_idx";

-- DropIndex
DROP INDEX "products_storeId_idx";

-- DropIndex
DROP INDEX "stores_status_idx";

-- DropIndex
DROP INDEX "users_affiliateStatus_idx";

-- AlterTable
ALTER TABLE "affiliate_products" DROP COLUMN "affiliateId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "featured_products" DROP COLUMN "badgeText",
DROP COLUMN "bannerUrl",
DROP COLUMN "createdById",
DROP COLUMN "endsAt",
DROP COLUMN "isActive",
DROP COLUMN "placement",
DROP COLUMN "position",
DROP COLUMN "startsAt",
ADD COLUMN     "aspectRatio" DOUBLE PRECISION,
ADD COLUMN     "bannerDesktop" TEXT NOT NULL,
ADD COLUMN     "bannerMobile" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "textColor" TEXT NOT NULL DEFAULT 'light',
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "subtitle" SET NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "commission",
DROP COLUMN "productCategoryId",
DROP COLUMN "publishedAt",
DROP COLUMN "specs",
DROP COLUMN "status",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "reviewsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "storeId" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "affiliateStatus",
DROP COLUMN "payoutMethod";

-- DropTable
DROP TABLE "commissions";

-- DropTable
DROP TABLE "link_clicks";

-- DropTable
DROP TABLE "order_items";

-- DropTable
DROP TABLE "orders";

-- DropTable
DROP TABLE "payouts";

-- DropTable
DROP TABLE "product_categories";

-- DropTable
DROP TABLE "product_images";

-- DropTable
DROP TABLE "product_stats";

-- DropTable
DROP TABLE "store_members";

-- DropEnum
DROP TYPE "CommissionStatus";

-- DropEnum
DROP TYPE "CommissionType";

-- DropEnum
DROP TYPE "FeaturedPlacement";

-- DropEnum
DROP TYPE "OrderStatus";

-- DropEnum
DROP TYPE "PayoutMethod";

-- DropEnum
DROP TYPE "PayoutStatus";

-- DropEnum
DROP TYPE "ProductStatus";

-- DropEnum
DROP TYPE "StoreRole";

-- DropEnum
DROP TYPE "StoreStatus";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_specs" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "product_specs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_products_userId_productId_key" ON "affiliate_products"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_products_productId_key" ON "featured_products"("productId");

-- CreateIndex
CREATE INDEX "products_categoryId_idx" ON "products"("categoryId");

-- CreateIndex
CREATE INDEX "products_createdAt_idx" ON "products"("createdAt");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_specs" ADD CONSTRAINT "product_specs_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_products" ADD CONSTRAINT "affiliate_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
