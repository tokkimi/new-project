-- AlterTable
ALTER TABLE "skin_profiles" ADD COLUMN     "exerciseFrequency" TEXT,
ADD COLUMN     "sleepHours" TEXT,
ADD COLUMN     "smokes" TEXT,
ADD COLUMN     "stressLevel" TEXT,
ADD COLUMN     "sunExposure" TEXT,
ADD COLUMN     "waterIntake" TEXT;

-- CreateTable
CREATE TABLE "bilans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "faceScanResultId" TEXT,
    "auditRunId" TEXT,
    "lifestyle" JSONB NOT NULL,
    "auditSnapshot" JSONB NOT NULL,
    "scanSnapshot" JSONB,
    "overallScore" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bilans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bilans_userId_createdAt_idx" ON "bilans"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "bilans" ADD CONSTRAINT "bilans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
