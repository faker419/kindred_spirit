-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "SubMoodTopic" (
    "id" SERIAL NOT NULL,
    "subMoodId" INTEGER NOT NULL,
    "topicId" INTEGER NOT NULL,

    CONSTRAINT "SubMoodTopic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubMoodTopic_subMoodId_topicId_key" ON "SubMoodTopic"("subMoodId", "topicId");

-- AddForeignKey
ALTER TABLE "SubMoodTopic" ADD CONSTRAINT "SubMoodTopic_subMoodId_fkey" FOREIGN KEY ("subMoodId") REFERENCES "SubMood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubMoodTopic" ADD CONSTRAINT "SubMoodTopic_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
