-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Graphic_Design', 'UI_UX_Design', 'Frontend_Development', 'Backend_Development', 'Mobile_Development', 'Desktop_Development', 'Game_Development', 'FullStack_Development', 'Marketing', 'Video_Editing');

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "image_profile" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "average_rating" DECIMAL(2,1) NOT NULL DEFAULT 0,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "image_profile" TEXT,
    "bio" TEXT,
    "hourly_rate" INTEGER NOT NULL DEFAULT 0,
    "average_rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "profile_views_per_week" SMALLINT NOT NULL DEFAULT 0,
    "week_views_start" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Freelancer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "min_price" INTEGER NOT NULL,
    "max_price" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadline_duration" SMALLINT NOT NULL,
    "is_opened" BOOLEAN NOT NULL DEFAULT true,
    "no_of_offers" SMALLINT NOT NULL,
    "category" "Category" NOT NULL,
    "client_id" INTEGER NOT NULL,
    "keywords" JSONB NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client_Notification" (
    "id" SERIAL NOT NULL,
    "notification_text" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "Client_Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client_Review" (
    "id" SERIAL NOT NULL,
    "review_text" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "client_id" INTEGER NOT NULL,

    CONSTRAINT "Client_Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer_Review" (
    "id" SERIAL NOT NULL,
    "review_text" TEXT NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL,
    "freelancer_id" INTEGER NOT NULL,

    CONSTRAINT "Freelancer_Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "asking_price" INTEGER NOT NULL,
    "implementation_duration" SMALLINT NOT NULL,
    "task_id" INTEGER NOT NULL,
    "freelancer_id" INTEGER NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer_Link" (
    "id" SERIAL NOT NULL,
    "link" TEXT NOT NULL,
    "freelancer_id" INTEGER NOT NULL,

    CONSTRAINT "Freelancer_Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer_Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "freelancer_id" INTEGER NOT NULL,

    CONSTRAINT "Freelancer_Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Freelancer_Project_Image" (
    "id" SERIAL NOT NULL,
    "project_image" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,

    CONSTRAINT "Freelancer_Project_Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_number_key" ON "Client"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Freelancer_phone_number_key" ON "Freelancer"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Freelancer_email_key" ON "Freelancer"("email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Notification" ADD CONSTRAINT "Client_Notification_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client_Review" ADD CONSTRAINT "Client_Review_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freelancer_Review" ADD CONSTRAINT "Freelancer_Review_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freelancer_Link" ADD CONSTRAINT "Freelancer_Link_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freelancer_Project" ADD CONSTRAINT "Freelancer_Project_freelancer_id_fkey" FOREIGN KEY ("freelancer_id") REFERENCES "Freelancer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Freelancer_Project_Image" ADD CONSTRAINT "Freelancer_Project_Image_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Freelancer_Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
