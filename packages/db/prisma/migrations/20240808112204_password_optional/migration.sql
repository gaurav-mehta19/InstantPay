/*
  Warnings:

  - The values [PENDING,SUCCESS,FAILED] on the enum `OnRampStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OnRampStatus_new" AS ENUM ('Processing', 'Success', 'Failed');
ALTER TABLE "OnRampTransaction" ALTER COLUMN "status" TYPE "OnRampStatus_new" USING ("status"::text::"OnRampStatus_new");
ALTER TYPE "OnRampStatus" RENAME TO "OnRampStatus_old";
ALTER TYPE "OnRampStatus_new" RENAME TO "OnRampStatus";
DROP TYPE "OnRampStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
