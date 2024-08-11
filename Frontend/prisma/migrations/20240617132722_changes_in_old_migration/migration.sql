/*
  Warnings:

  - You are about to drop the `ChildDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParentDevices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChildDevice" DROP CONSTRAINT "ChildDevice_parentDevice_fkey";

-- DropTable
DROP TABLE "ChildDevice";

-- DropTable
DROP TABLE "ParentDevices";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "isParent" BOOLEAN NOT NULL DEFAULT false,
    "isChild" BOOLEAN NOT NULL DEFAULT false,
    "ChildrenId" TEXT[],
    "ParentId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Child" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "good" INTEGER NOT NULL,

    CONSTRAINT "Child_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Profile_id_idx" ON "Profile"("id");

-- CreateIndex
CREATE INDEX "Profile_profileId_idx" ON "Profile"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_profileId_key" ON "Profile"("profileId");

-- AddForeignKey
ALTER TABLE "Child" ADD CONSTRAINT "Child_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
