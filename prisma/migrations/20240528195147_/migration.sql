/*
  Warnings:

  - The primary key for the `RouteValidations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `validationId` on the `RouteValidations` table. All the data in the column will be lost.
  - You are about to drop the column `validations` on the `Validation` table. All the data in the column will be lost.
  - Added the required column `modelsId` to the `RouteValidations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objectSchema` to the `Validation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "objectSchema" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RouteValidations" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "routeId" INTEGER NOT NULL,
    "modelsId" INTEGER NOT NULL,

    PRIMARY KEY ("routeId", "modelsId"),
    CONSTRAINT "RouteValidations_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RouteValidations_modelsId_fkey" FOREIGN KEY ("modelsId") REFERENCES "Model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RouteValidations" ("createdAt", "deletedAt", "routeId") SELECT "createdAt", "deletedAt", "routeId" FROM "RouteValidations";
DROP TABLE "RouteValidations";
ALTER TABLE "new_RouteValidations" RENAME TO "RouteValidations";
CREATE TABLE "new_Validation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "objectSchema" TEXT NOT NULL
);
INSERT INTO "new_Validation" ("createdAt", "deletedAt", "description", "id", "name", "updatedAt") SELECT "createdAt", "deletedAt", "description", "id", "name", "updatedAt" FROM "Validation";
DROP TABLE "Validation";
ALTER TABLE "new_Validation" RENAME TO "Validation";
PRAGMA foreign_key_check("RouteValidations");
PRAGMA foreign_key_check("Validation");
PRAGMA foreign_keys=ON;
