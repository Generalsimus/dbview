/*
  Warnings:

  - Made the column `validations` on table `Validation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Validation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "validations" TEXT NOT NULL
);
INSERT INTO "new_Validation" ("createdAt", "deletedAt", "description", "id", "name", "updatedAt", "validations") SELECT "createdAt", "deletedAt", "description", "id", "name", "updatedAt", "validations" FROM "Validation";
DROP TABLE "Validation";
ALTER TABLE "new_Validation" RENAME TO "Validation";
PRAGMA foreign_key_check("Validation");
PRAGMA foreign_keys=ON;
