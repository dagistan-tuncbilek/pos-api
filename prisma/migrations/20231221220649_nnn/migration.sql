/*
  Warnings:

  - You are about to drop the column `optional` on the `validations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `properties` ADD COLUMN `optional` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `validations` DROP COLUMN `optional`;
