import Sequelize from "@sequelize/core";
import path from "path";
import * as  sqlite3 from "sqlite3"



const storagePath = path.join(__dirname, "../../../../storage.sqlite");
export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: storagePath,
    dialectModule: sqlite3,
    // dialectModule: sqlite3,
    // models: [ProjectSettingModel, RouteModel, ServiceModel, ValidationModel],
    // query: {
    //     plain: true
    // },
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
// sequelize.sync({ force: true });
sequelize.sync({ alter: true });