/*
  Warnings:

  - You are about to drop the `CheckIn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gym` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- DropTable
DROP TABLE "CheckIn";

-- DropTable
DROP TABLE "Gym";

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_out" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "gym_id" TEXT NOT NULL,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "phone" TEXT,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
