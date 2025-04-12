/*
  Warnings:

  - Added the required column `OrganizationId` to the `soul` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "soul" ADD COLUMN     "OrganizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "soul" ADD CONSTRAINT "soul_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
