import { Sequelize } from "sequelize";
import * as  sqlite3 from "sqlite3"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    dialectModule: sqlite3,
    define: {
        timestamps: true,

        paranoid: true,

        createdAt: true,
        updatedAt: true,
        deletedAt: true,
    },
    logging: false

});

