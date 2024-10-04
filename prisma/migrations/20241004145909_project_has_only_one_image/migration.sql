/*
  Warnings:

  - You are about to drop the `Freelancer_Project_Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Freelancer_Project_Image" DROP CONSTRAINT "Freelancer_Project_Image_project_id_fkey";

-- AlterTable
ALTER TABLE "Freelancer_Project" ADD COLUMN     "project_image" TEXT;

-- DropTable
DROP TABLE "Freelancer_Project_Image";
