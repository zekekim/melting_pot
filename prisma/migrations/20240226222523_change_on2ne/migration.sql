/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_postId_key" ON "Recipe"("postId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
