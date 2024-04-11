// import { Sequelize } from "sequelize";
import * as  sqlite3 from "sqlite3"
import path from "path"
import Sequelize from "@sequelize/core";
import { ProjectSettingModel } from "./models/project-settings";
import { RouteModel } from "./models/route";
import { ServiceModel } from "./models/Service";
import { ValidationModel } from "./models/validation";

const storagePath = path.join(__dirname, '../../../../storage.sqlite');

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    dialectModule: sqlite3,
    models: [ProjectSettingModel, RouteModel, ServiceModel, ValidationModel],
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
// sequelize.
// sequelize.sync

sequelize.sync({ force: true });
console.log("🚀 --> sequelize.sync --> e:");