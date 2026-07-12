CREATE TABLE "ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKo" TEXT,
    "inciName" TEXT,
    "aliases" TEXT[],
    "description" TEXT,
    "origin" TEXT,
    "function" TEXT,
    "benefits" TEXT[],
    "sideEffects" TEXT[],
    "recommendedConcentration" TEXT,
    "pregnancySafety" TEXT,
    "photosensitivity" BOOLEAN,
    "precautions" TEXT[],
    "timePreference" TEXT NOT NULL DEFAULT 'both',
    "layerWeight" INTEGER NOT NULL DEFAULT 50,
    "sourceNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingredients_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "product_ingredients" (
    "productId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "role" TEXT,
    "concentration" TEXT,
    "sourceNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_ingredients_pkey" PRIMARY KEY ("productId","ingredientId")
);

CREATE TABLE "compatibility_rules" (
    "id" TEXT NOT NULL,
    "ingredientAId" TEXT NOT NULL,
    "ingredientBId" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "guidance" TEXT,
    "evidenceLevel" TEXT,
    "sourceNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compatibility_rules_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ingredients_aliases_idx" ON "ingredients" USING GIN ("aliases");
CREATE INDEX "product_ingredients_ingredientId_idx" ON "product_ingredients"("ingredientId");
CREATE INDEX "compatibility_rules_ingredientAId_idx" ON "compatibility_rules"("ingredientAId");
CREATE INDEX "compatibility_rules_ingredientBId_idx" ON "compatibility_rules"("ingredientBId");

ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "product_ingredients" ADD CONSTRAINT "product_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "compatibility_rules" ADD CONSTRAINT "compatibility_rules_ingredientAId_fkey" FOREIGN KEY ("ingredientAId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "compatibility_rules" ADD CONSTRAINT "compatibility_rules_ingredientBId_fkey" FOREIGN KEY ("ingredientBId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
