-- AlterTable
ALTER TABLE `customers` ADD COLUMN `customerTypeId` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `customers` ADD CONSTRAINT `customers_customerTypeId_fkey` FOREIGN KEY (`customerTypeId`) REFERENCES `customer_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
