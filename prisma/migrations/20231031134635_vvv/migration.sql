/*
  Warnings:

  - You are about to drop the `app-logs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `app-logs`;

-- CreateTable
CREATE TABLE `app_logs` (
    `id` VARCHAR(191) NOT NULL,
    `level` VARCHAR(255) NOT NULL,
    `message` TEXT NULL,
    `stack` JSON NULL,
    `context` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
