/*
  Warnings:

  - Made the column `context` on table `app-logs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `app-logs` ADD COLUMN `stack` JSON NULL,
    MODIFY `context` VARCHAR(191) NOT NULL;
