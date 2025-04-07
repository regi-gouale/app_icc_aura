-- CreateTable
CREATE TABLE "soul" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "gender" TEXT,
    "ageRange" TEXT,
    "maritalStatus" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "phone" TEXT,
    "email" TEXT,
    "address" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "profession" TEXT,
    "description" TEXT,
    "image" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ministryId" TEXT,
    "departmentId" TEXT,

    CONSTRAINT "soul_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "image" TEXT,
    "metadata" TEXT,
    "numberOfAttendees" INTEGER,
    "numberOfPrayers" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_invitation" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "soulId" TEXT,
    "inviterId" TEXT,

    CONSTRAINT "event_invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prayer" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "soulId" TEXT NOT NULL,
    "prayerDate" TIMESTAMP(3) NOT NULL,
    "prayerTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prayerType" TEXT,
    "desireToBeAccompanied" BOOLEAN,

    CONSTRAINT "prayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soul_integration" (
    "id" TEXT NOT NULL,
    "soulId" TEXT NOT NULL,
    "integration" TEXT NOT NULL,
    "wantToJoin" BOOLEAN NOT NULL,
    "waitingList" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "adviserId" TEXT,

    CONSTRAINT "soul_integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soul_feedback" (
    "id" TEXT NOT NULL,
    "soulId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "soul_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ministry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "metadata" TEXT,
    "membersId" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "responsibleId" TEXT,

    CONSTRAINT "ministry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ministryId" TEXT,
    "members" TEXT[],
    "responsibleId" TEXT,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_invitation" ADD CONSTRAINT "event_invitation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event_invitation" ADD CONSTRAINT "event_invitation_soulId_fkey" FOREIGN KEY ("soulId") REFERENCES "soul"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer" ADD CONSTRAINT "prayer_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer" ADD CONSTRAINT "prayer_soulId_fkey" FOREIGN KEY ("soulId") REFERENCES "soul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soul_integration" ADD CONSTRAINT "soul_integration_soulId_fkey" FOREIGN KEY ("soulId") REFERENCES "soul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "soul_feedback" ADD CONSTRAINT "soul_feedback_soulId_fkey" FOREIGN KEY ("soulId") REFERENCES "soul"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ministry" ADD CONSTRAINT "ministry_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "soul"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "ministry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "department" ADD CONSTRAINT "department_responsibleId_fkey" FOREIGN KEY ("responsibleId") REFERENCES "soul"("id") ON DELETE SET NULL ON UPDATE CASCADE;
