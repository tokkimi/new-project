-- CreateTable
CREATE TABLE "product_reactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT,
    "type" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_reactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_reactions_userId_createdAt_idx" ON "product_reactions"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "product_reactions_userId_productId_idx" ON "product_reactions"("userId", "productId");

-- AddForeignKey
ALTER TABLE "product_reactions" ADD CONSTRAINT "product_reactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reactions" ADD CONSTRAINT "product_reactions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
