-- CreateTable
CREATE TABLE "routine_protocols" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "changeKind" TEXT NOT NULL,
    "productId" TEXT,
    "note" TEXT,
    "durationDays" INTEGER NOT NULL DEFAULT 14,
    "status" TEXT NOT NULL DEFAULT 'active',
    "outcome" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "routine_protocols_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "routine_protocols_userId_status_idx" ON "routine_protocols"("userId", "status");

-- AddForeignKey
ALTER TABLE "routine_protocols" ADD CONSTRAINT "routine_protocols_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "routine_protocols" ADD CONSTRAINT "routine_protocols_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
