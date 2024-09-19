/*
  Warnings:

  - A unique constraint covering the columns `[task_id,freelancer_id]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Offer_task_id_freelancer_id_key" ON "Offer"("task_id", "freelancer_id");
