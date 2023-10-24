-- AlterTable
ALTER TABLE "User" ALTER COLUMN "watchList" SET DEFAULT ARRAY['1: red', '2: blue', '3: green']::TEXT[];
