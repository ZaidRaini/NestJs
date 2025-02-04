-- CreateTable
CREATE TABLE "URL" (
    "id" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "shortUrlPath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "URL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "URL_longUrl_key" ON "URL"("longUrl");

-- CreateIndex
CREATE UNIQUE INDEX "URL_shortUrlPath_key" ON "URL"("shortUrlPath");
