import { Sequelize } from "sequelize";
import * as  sqlite3 from "sqlite3"
import path from "path"

const storagePath = path.join(__dirname, '../../../../storage.sqlite');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    dialectModule: sqlite3,
    define: {
        timestamps: true,

        paranoid: true,

        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        omitNull: true,
        // rejectOnEmpty: true // Specifying true here removes `null` from the return type!
    },
    logging: false,
    omitNull: true,

});

