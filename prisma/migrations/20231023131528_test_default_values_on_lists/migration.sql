-- AlterTable
ALTER TABLE "User" ALTER COLUMN "watchList" SET DEFAULT ARRAY['red', 'blue', 'green']::TEXT[];
