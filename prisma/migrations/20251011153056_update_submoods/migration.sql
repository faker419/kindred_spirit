/*
  Warnings:

  - You are about to drop the column `desc` on the `Topic` table. All the data in the column will be lost.
  - You are about to drop the `MoodCompatibility` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CompatibilityType" AS ENUM ('PARALLEL', 'COMPLEMENTARY', 'OPPOSING');

-- AlterTable
ALTER TABLE "SubMood" ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "SubMoodTopic" ADD COLUMN     "relevance" INTEGER;

-- AlterTable
ALTER TABLE "Topic" DROP COLUMN "desc",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "visible" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "public"."MoodCompatibility";

-- CreateTable
CREATE TABLE "SubMoodCompatibility" (
    "id" SERIAL NOT NULL,
    "subMoodAId" INTEGER NOT NULL,
    "subMoodBId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "type" "CompatibilityType" NOT NULL DEFAULT 'COMPLEMENTARY',

    CONSTRAINT "SubMoodCompatibility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubMoodCompatibility_subMoodAId_subMoodBId_key" ON "SubMoodCompatibility"("subMoodAId", "subMoodBId");

-- AddForeignKey
ALTER TABLE "SubMoodCompatibility" ADD CONSTRAINT "SubMoodCompatibility_subMoodAId_fkey" FOREIGN KEY ("subMoodAId") REFERENCES "SubMood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMoodCompatibility" ADD CONSTRAINT "SubMoodCompatibility_subMoodBId_fkey" FOREIGN KEY ("subMoodBId") REFERENCES "SubMood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
