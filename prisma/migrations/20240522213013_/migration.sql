/*
  Warnings:

  - You are about to drop the column `validations` on the `Services` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Services" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "methods" TEXT
);
INSERT INTO "new_Services" ("createdAt", "deletedAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "deletedAt", "description", "id", "name", "updatedAt" FROM "Services";
DROP TABLE "Services";
ALTER TABLE "new_Services" RENAME TO "Services";
PRAGMA foreign_key_check("Services");
PRAGMA foreign_keys=ON;
