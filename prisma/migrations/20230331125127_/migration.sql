/*
  Warnings:

  - You are about to drop the column `validated_out` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validated_out",
ADD COLUMN     "validated_at" TIMESTAMP(3);
