-- AlterTable
ALTER TABLE "User" ALTER COLUMN "watchList" SET DEFAULT ARRAY['red', 'blue', 'green']::TEXT[];

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "movie_id" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
