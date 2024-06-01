/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `RouteValidations` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RouteValidations" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "routeId" INTEGER NOT NULL,
    "validationId" INTEGER NOT NULL,

    PRIMARY KEY ("routeId", "validationId"),
    CONSTRAINT "RouteValidations_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RouteValidations_validationId_fkey" FOREIGN KEY ("validationId") REFERENCES "Validation" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_RouteValidations" ("deletedAt", "routeId", "validationId") SELECT "deletedAt", "routeId", "validationId" FROM "RouteValidations";
DROP TABLE "RouteValidations";
ALTER TABLE "new_RouteValidations" RENAME TO "RouteValidations";
PRAGMA foreign_key_check("RouteValidations");
PRAGMA foreign_keys=ON;
