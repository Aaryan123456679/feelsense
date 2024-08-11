-- CreateTable
CREATE TABLE "ParentDevices" (
    "id" TEXT NOT NULL,
    "parentDevice" TEXT NOT NULL,

    CONSTRAINT "ParentDevices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChildDevice" (
    "id" TEXT NOT NULL,
    "childDevice" TEXT NOT NULL,
    "parentDevice" TEXT NOT NULL,

    CONSTRAINT "ChildDevice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ParentDevices_parentDevice_idx" ON "ParentDevices"("parentDevice");

-- CreateIndex
CREATE UNIQUE INDEX "ParentDevices_parentDevice_key" ON "ParentDevices"("parentDevice");

-- CreateIndex
CREATE INDEX "ChildDevice_childDevice_idx" ON "ChildDevice"("childDevice");

-- CreateIndex
CREATE UNIQUE INDEX "ChildDevice_childDevice_key" ON "ChildDevice"("childDevice");

-- AddForeignKey
ALTER TABLE "ChildDevice" ADD CONSTRAINT "ChildDevice_parentDevice_fkey" FOREIGN KEY ("parentDevice") REFERENCES "ParentDevices"("parentDevice") ON DELETE CASCADE ON UPDATE CASCADE;
