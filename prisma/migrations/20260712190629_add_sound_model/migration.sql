-- CreateTable
CREATE TABLE "sounds" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "labelKo" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionKo" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "synthesisMode" TEXT,
    "audioUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sounds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sounds_slug_key" ON "sounds"("slug");
