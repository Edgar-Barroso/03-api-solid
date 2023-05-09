-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBRO');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'MEMBRO';
