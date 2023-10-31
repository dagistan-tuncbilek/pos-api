-- CreateTable
CREATE TABLE `app-logs` (
    `id` VARCHAR(191) NOT NULL,
    `level` VARCHAR(255) NOT NULL,
    `message` TEXT NULL,
    `context` JSON NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
