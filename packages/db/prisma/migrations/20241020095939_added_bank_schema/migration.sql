-- CreateTable
CREATE TABLE "Bank" (
    "id" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Bank_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_accountNumber_key" ON "Bank"("accountNumber");
