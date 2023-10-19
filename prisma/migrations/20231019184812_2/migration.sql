/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `companyId` INTEGER UNSIGNED NULL,
    ADD COLUMN `role` ENUM('SuperAdmin', 'Admin', 'Developer', 'User') NOT NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
