/*
  Warnings:

  - A unique constraint covering the columns `[propertyId]` on the table `validations` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `app_logs` MODIFY `level` TINYTEXT NOT NULL,
    MODIFY `context` TINYTEXT NOT NULL;

-- CreateTable
CREATE TABLE `password_reset` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(1000) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `validations_propertyId_key` ON `validations`(`propertyId`);
