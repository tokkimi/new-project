-- CreateTable
CREATE TABLE "face_scan_results" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "overallScore" INTEGER NOT NULL,
    "skinType" TEXT,
    "summary" TEXT,
    "analysis" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "face_scan_results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "face_scan_results_userId_createdAt_idx" ON "face_scan_results"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "face_scan_results" ADD CONSTRAINT "face_scan_results_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
