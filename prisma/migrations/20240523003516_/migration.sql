/*
  Warnings:

  - Made the column `methods` on table `Service` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Service" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "methods" TEXT NOT NULL
);
INSERT INTO "new_Service" ("createdAt", "deletedAt", "description", "id", "methods", "name", "updatedAt") SELECT "createdAt", "deletedAt", "description", "id", "methods", "name", "updatedAt" FROM "Service";
DROP TABLE "Service";
ALTER TABLE "new_Service" RENAME TO "Service";
PRAGMA foreign_key_check("Service");
PRAGMA foreign_keys=ON;
