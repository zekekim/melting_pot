/*
  Warnings:

  - You are about to drop the column `recipeId` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_recipeId_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "recipeId";
