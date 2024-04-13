// import { Sequelize } from "sequelize";
import * as  sqlite3 from "sqlite3"
import path from "path"
import Sequelize from "@sequelize/core";
import { DataSource } from "typeorm";
import { RouteTable } from "./models/route";
import { ProjectSettingTable } from "./models/project-settings";
import { ServiceTable } from "./models/Service";
import { ValidationTable } from "./models/validation";

const storagePath = path.join(__dirname, '../../../../storagerrrrr.sqlite');


export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: path.join(__dirname, '../../../../storagoooooo.sqlite'), // SQLite database file
    synchronize: true, // Auto-create database schema
    logging: true,
    entities: [
        RouteTable,
        ProjectSettingTable,
        ServiceTable,
        ValidationTable
    ]
    // type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    // database: "test",
    // synchronize: true,
    // logging: true,
    // entities: [Post, Category],
    // subscribers: [],
    // migrations: [],
});
AppDataSource.initialize();



export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storagePath,
    dialectModule: sqlite3,
    // models: [ProjectSettingModel, RouteModel, ServiceModel, ValidationModel],
    // sync: { alter: true },
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
sequelize.sync({ alter: true }) 