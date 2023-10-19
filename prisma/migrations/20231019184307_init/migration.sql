-- CreateTable
CREATE TABLE `companies` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TINYTEXT NOT NULL,
    `vat` TINYTEXT NULL,
    `email` TINYTEXT NULL,
    `phone` TINYTEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TINYTEXT NOT NULL,
    `jobTitle` TINYTEXT NULL,
    `email` TINYTEXT NULL,
    `phone` TINYTEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `number` TINYTEXT NOT NULL,
    `name` TINYTEXT NOT NULL,
    `vat` TINYTEXT NULL,
    `note` TINYTEXT NULL,
    `daylite` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `address` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER UNSIGNED NOT NULL,
    `street` TINYTEXT NULL,
    `city` TINYTEXT NULL,
    `country` TINYTEXT NULL,
    `postcode` TINYTEXT NULL,
    `state` TINYTEXT NULL,
    `type` TINYTEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contacts` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER UNSIGNED NOT NULL,
    `name` TINYTEXT NULL,
    `jobTitle` TINYTEXT NULL,
    `phone` TINYTEXT NULL,
    `email` TINYTEXT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_types` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER UNSIGNED NOT NULL,
    `type` TINYTEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `properties` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerTypeId` INTEGER UNSIGNED NOT NULL,
    `name` TINYTEXT NOT NULL,
    `inputType` ENUM('Text', 'Number', 'Checkbox', 'Date') NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `validations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `propertyId` INTEGER UNSIGNED NOT NULL,
    `maxLength` INTEGER UNSIGNED NULL,
    `minLength` INTEGER UNSIGNED NULL,
    `max` INTEGER NULL,
    `min` INTEGER NULL,
    `isEmail` BOOLEAN NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER UNSIGNED NOT NULL,
    `userId` INTEGER UNSIGNED NULL,
    `number` TINYTEXT NOT NULL,
    `name` TINYTEXT NOT NULL,
    `description` TINYTEXT NOT NULL,
    `serviceType` TINYTEXT NOT NULL,
    `resources` BOOLEAN NOT NULL DEFAULT true,
    `resourcesCar` TINYTEXT NULL,
    `riskAcceptable` BOOLEAN NOT NULL DEFAULT true,
    `riskCar` TINYTEXT NULL,
    `subcontractor` TINYTEXT NOT NULL,
    `daylite` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `date` DATETIME(3) NULL,
    `deliveryDate` DATETIME(3) NULL,
    `completionDate` DATETIME(3) NULL,
    `price` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `orders_projectId_key`(`projectId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `documentId` INTEGER UNSIGNED NULL,
    `type` TINYTEXT NOT NULL,
    `userId` INTEGER UNSIGNED NOT NULL,
    `reviewDate` DATETIME(3) NULL,
    `completionDate` DATETIME(3) NULL,
    `price` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `reports_documentId_key`(`documentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `documentId` INTEGER UNSIGNED NULL,
    `invoiceId` TINYTEXT NULL,
    `price` DOUBLE NULL,
    `date` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `invoices_documentId_key`(`documentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `quotationId` TINYTEXT NULL,
    `price` DOUBLE NULL,
    `date` DATETIME(3) NULL,
    `isDone` BOOLEAN NOT NULL DEFAULT false,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expenses` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `vehicle` TINYTEXT NOT NULL,
    `cost` DOUBLE NOT NULL,
    `date` DATETIME(3) NULL,
    `travelTime` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medias` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `projectId` INTEGER UNSIGNED NOT NULL,
    `path` TINYTEXT NOT NULL,
    `filename` TINYTEXT NOT NULL,
    `size` INTEGER UNSIGNED NOT NULL,
    `originalname` TINYTEXT NOT NULL,
    `mimetype` TINYTEXT NOT NULL,
    `description` TINYTEXT NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `address` ADD CONSTRAINT `address_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contacts` ADD CONSTRAINT `contacts_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `customer_types` ADD CONSTRAINT `customer_types_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `companies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `properties` ADD CONSTRAINT `properties_customerTypeId_fkey` FOREIGN KEY (`customerTypeId`) REFERENCES `customer_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `validations` ADD CONSTRAINT `validations_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `properties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `medias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_documentId_fkey` FOREIGN KEY (`documentId`) REFERENCES `medias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expenses` ADD CONSTRAINT `expenses_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medias` ADD CONSTRAINT `medias_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
