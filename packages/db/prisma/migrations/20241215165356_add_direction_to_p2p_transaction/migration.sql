/*
  Warnings:

  - Added the required column `direction` to the `P2PTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "P2PTransaction" ADD COLUMN     "direction" TEXT NOT NULL;
