-- CreateTable
CREATE TABLE "product_market_formulas" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "inciText" TEXT NOT NULL,
    "sourceName" TEXT,
    "sourceUrl" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_market_formulas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "product_market_formulas_productId_idx" ON "product_market_formulas"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_market_formulas_productId_market_key" ON "product_market_formulas"("productId", "market");

-- AddForeignKey
ALTER TABLE "product_market_formulas" ADD CONSTRAINT "product_market_formulas_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
