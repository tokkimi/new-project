CREATE TABLE "user_product_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "routineSlot" TEXT NOT NULL DEFAULT 'both',
    "customCategory" TEXT,
    "note" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_product_preferences_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_notes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_notes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "saved_routine_links" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" TEXT,
    "note" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "saved_routine_links_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "user_product_preferences_userId_productId_key" ON "user_product_preferences"("userId", "productId");
CREATE INDEX "user_product_preferences_userId_idx" ON "user_product_preferences"("userId");
CREATE INDEX "user_product_preferences_productId_idx" ON "user_product_preferences"("productId");
CREATE INDEX "user_notes_userId_idx" ON "user_notes"("userId");
CREATE INDEX "saved_routine_links_userId_idx" ON "saved_routine_links"("userId");

ALTER TABLE "user_product_preferences" ADD CONSTRAINT "user_product_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_product_preferences" ADD CONSTRAINT "user_product_preferences_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_notes" ADD CONSTRAINT "user_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "saved_routine_links" ADD CONSTRAINT "saved_routine_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;