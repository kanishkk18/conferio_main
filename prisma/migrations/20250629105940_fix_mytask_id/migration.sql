/*
  Warnings:

  - The primary key for the `MyTask` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `MyTask` table. All the data in the column will be lost.
  - The required column `id` was added to the `MyTask` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "MyTask" DROP CONSTRAINT "MyTask_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MyTask_pkey" PRIMARY KEY ("id");
