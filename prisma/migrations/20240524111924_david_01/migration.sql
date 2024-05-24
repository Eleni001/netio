/*
  Warnings:

  - You are about to drop the column `categoryName` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "categoryName",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");
