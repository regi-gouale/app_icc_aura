/*
  Warnings:

  - You are about to drop the `department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event_invitation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ministry` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `prayer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `soul` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `soul_feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `soul_integration` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `slug` on table `organization` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "department_ministryId_fkey";

-- DropForeignKey
ALTER TABLE "department" DROP CONSTRAINT "department_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "event_invitation" DROP CONSTRAINT "event_invitation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "event_invitation" DROP CONSTRAINT "event_invitation_soulId_fkey";

-- DropForeignKey
ALTER TABLE "ministry" DROP CONSTRAINT "ministry_responsibleId_fkey";

-- DropForeignKey
ALTER TABLE "prayer" DROP CONSTRAINT "prayer_eventId_fkey";

-- DropForeignKey
ALTER TABLE "prayer" DROP CONSTRAINT "prayer_soulId_fkey";

-- DropForeignKey
ALTER TABLE "soul_feedback" DROP CONSTRAINT "soul_feedback_soulId_fkey";

-- DropForeignKey
ALTER TABLE "soul_integration" DROP CONSTRAINT "soul_integration_soulId_fkey";

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "slug" SET NOT NULL;

-- DropTable
DROP TABLE "department";

-- DropTable
DROP TABLE "event";

-- DropTable
DROP TABLE "event_invitation";

-- DropTable
DROP TABLE "ministry";

-- DropTable
DROP TABLE "prayer";

-- DropTable
DROP TABLE "soul";

-- DropTable
DROP TABLE "soul_feedback";

-- DropTable
DROP TABLE "soul_integration";
