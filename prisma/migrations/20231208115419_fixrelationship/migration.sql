/*
  Warnings:

  - You are about to drop the column `userId` on the `ChatInstance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatInstance" DROP CONSTRAINT "ChatInstance_userId_fkey";

-- AlterTable
ALTER TABLE "ChatInstance" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "ChatUser" (
    "userId" INTEGER NOT NULL,
    "chatInstanceId" INTEGER NOT NULL,

    CONSTRAINT "ChatUser_pkey" PRIMARY KEY ("userId","chatInstanceId")
);

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatUser" ADD CONSTRAINT "ChatUser_chatInstanceId_fkey" FOREIGN KEY ("chatInstanceId") REFERENCES "ChatInstance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
