-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('NONE', 'TRIALING', 'ACTIVE', 'PAST_DUE', 'CANCELED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "newsletterSubscribed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "subscriptionPriceId" TEXT,
ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'NONE';

-- CreateTable
CREATE TABLE "skin_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skinType" TEXT NOT NULL,
    "concerns" TEXT[],
    "ageRange" TEXT,
    "sensitivities" TEXT[],
    "climate" TEXT,
    "goals" TEXT[],
    "budget" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skin_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_runs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ingredientIds" TEXT[],
    "fullIngredients" TEXT,
    "origin" TEXT,
    "description" TEXT,
    "usageSteps" TEXT[],
    "imageUrl" TEXT,
    "officialUrl" TEXT,
    "price" DOUBLE PRECISION,
    "currency" TEXT DEFAULT 'EUR',
    "skinTypes" TEXT[],
    "concerns" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_items" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "sourceName" TEXT,
    "sourceUrl" TEXT,
    "imageUrl" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscribers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "bodyHtml" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seo_meta" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "ogImage" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seo_meta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "path" TEXT,
    "userId" TEXT,
    "locale" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skin_profiles_userId_key" ON "skin_profiles"("userId");

-- CreateIndex
CREATE INDEX "audit_runs_userId_idx" ON "audit_runs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "news_items_category_idx" ON "news_items"("category");

-- CreateIndex
CREATE INDEX "news_items_publishedAt_idx" ON "news_items"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscribers_email_key" ON "newsletter_subscribers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seo_meta_path_locale_key" ON "seo_meta"("path", "locale");

-- CreateIndex
CREATE INDEX "events_type_idx" ON "events"("type");

-- CreateIndex
CREATE INDEX "events_createdAt_idx" ON "events"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeSubscriptionId_key" ON "users"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "skin_profiles" ADD CONSTRAINT "skin_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_runs" ADD CONSTRAINT "audit_runs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelf_items" ADD CONSTRAINT "shelf_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

