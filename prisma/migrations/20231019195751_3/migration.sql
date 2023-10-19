/*
  Warnings:

  - Added the required column `customerId` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_companyId_fkey`;

-- DropForeignKey
ALTER TABLE `contacts` DROP FOREIGN KEY `contacts_companyId_fkey`;

-- AlterTable
ALTER TABLE `address` ADD COLUMN `customerId` INTEGER UNSIGNED NOT NULL,
    MODIFY `companyId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `contacts` ADD COLUMN `customerId` INTEGER UNSIGNED NOT NULL,
    MODIFY `companyId` INTEGER UNSIGNED NULL;

-- AlterTable
ALTER TABLE `customers` ADD COLUMN `companyId` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
