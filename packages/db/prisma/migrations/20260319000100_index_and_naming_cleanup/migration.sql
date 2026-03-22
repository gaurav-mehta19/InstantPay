-- Rename confusing columns to clearer names
ALTER TABLE "P2PTransaction" RENAME COLUMN "direction" TO "transferKey";
ALTER TABLE "Bank" RENAME COLUMN "userID" TO "userId";

-- Ensure transfer idempotency key is unique
CREATE UNIQUE INDEX "P2PTransaction_transferKey_key" ON "P2PTransaction"("transferKey");

-- Query performance indexes
CREATE INDEX "OnRampTransaction_userId_createdAt_idx" ON "OnRampTransaction"("userId", "createdAt");
CREATE INDEX "OnRampTransaction_userId_status_createdAt_idx" ON "OnRampTransaction"("userId", "status", "createdAt");

CREATE INDEX "P2PTransaction_fromUserId_createdAt_idx" ON "P2PTransaction"("fromUserId", "createdAt");
CREATE INDEX "P2PTransaction_toUserId_createdAt_idx" ON "P2PTransaction"("toUserId", "createdAt");
CREATE INDEX "P2PTransaction_status_createdAt_idx" ON "P2PTransaction"("status", "createdAt");

CREATE INDEX "Bank_userId_idx" ON "Bank"("userId");
