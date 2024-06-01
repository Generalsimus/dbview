// "use server"
import { Kysely, ParseJSONResultsPlugin, SqliteDialect } from "kysely";
import path from "path";
import Database from "better-sqlite3";
import { DB } from "./types";
import url from "url";
// const url = require('');
// url.fileURLToPath(url);
// url.pathToFileURL(path);
// export const client = new PrismaClient();
// import Database from 'better-sqlite3'
// const sqlite3 = verbose();
// const db = new sqlite3.Database(":memory:");

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database(
      path.join(path.dirname(url.fileURLToPath(import.meta.url)), "./db.sqlite")
    ),
  }),
  plugins: [new ParseJSONResultsPlugin()]
});
// const storagePath = path.join(__dirname, "../../../../storage.sqlite");
// export const sequelize = new Sequelize({
//   dialect: "sqlite",ssssss
//   storage: storagePath,
//   // dialectModule: sqlite3,
//   // dialectModule: sqlite3,
//   // models: [ProjectSettingModel, RouteModel, ServiceModel, ValidationModel],
//   // query: {
//   //     plain: true
//   // },
//   define: {
//     timestamps: true,

//     paranoid: true,

//     createdAt: true,
//     updatedAt: true,
//     deletedAt: true,
//     omitNull: true,
//     // rejectOnEmpty: true // Specifying true here removes `null` from the return type!
//   },
//   logging: false,
//   omitNull: true,
// });
// sequelize.sync({ force: true });
// sequelize.sync({ alter: true });
