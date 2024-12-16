/*
  Warnings:

  - Added the required column `status` to the `P2PTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Processing', 'Success', 'Failed');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Processing';

-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "status" "Status" NOT NULL;
