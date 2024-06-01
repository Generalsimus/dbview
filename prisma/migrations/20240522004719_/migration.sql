-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProjectSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "backEndLanguage" TEXT,
    "backEndBuildDirection" TEXT,
    "frontEndBuildDirection" TEXT
);
INSERT INTO "new_ProjectSettings" ("backEndBuildDirection", "backEndLanguage", "createdAt", "deletedAt", "frontEndBuildDirection", "id", "updatedAt") SELECT "backEndBuildDirection", "backEndLanguage", "createdAt", "deletedAt", "frontEndBuildDirection", "id", "updatedAt" FROM "ProjectSettings";
DROP TABLE "ProjectSettings";
ALTER TABLE "new_ProjectSettings" RENAME TO "ProjectSettings";
PRAGMA foreign_key_check("ProjectSettings");
PRAGMA foreign_keys=ON;
