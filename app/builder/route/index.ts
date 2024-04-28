"use server";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { Route } from "@/basic/models/route/route";
import { ProjectSettingModel } from "@/db/models/project-settings";
import { languagesBuilder } from "@/syncCode";
import path from "path";
// sequelize
// console.log("🚀 --> sequelize:", sequelize);

export const buildRoute = async (routeDoc: MakeAsDbDoc<Route>) => {
  // console.log("🚀 --> buildRoute --> routeDoc:", routeDoc);
  const settingsModel = await ProjectSettingModel.findOne({ where: {} });
  const settingsDoc = settingsModel?.dataValues;
  if (!settingsDoc) return;
  const { frontEndBuildDirection, backEndBuildDirection } = settingsDoc;
  if (!backEndBuildDirection) return;

  const startBackFile = path.join(backEndBuildDirection, "server.ts");
  const writeRoteBackPath = path.join(backEndBuildDirection, routeDoc.path);
  const BuilderClass = settingsDoc.backEndLanguage ? languagesBuilder[settingsDoc.backEndLanguage] : undefined;
  if (BuilderClass) {
    const builder = new BuilderClass(frontEndBuildDirection || undefined, backEndBuildDirection || undefined);
    // builder.syncDependencies(settingsDoc);
    builder.buildRoute(routeDoc);
  }

  // console.log("🚀 --> buildRoute --> writeRoteBackPath:", writeRoteBackPath);
  // console.log("🚀 --> buildRoute --> writeRoteBackPath:", {
  //   frontEndBuildDirection,
  //   backEndBuildDirection,
  // });
  // const expressJsPath = resolve("express", { basedir: __dirname });
  //   writeFileSync(
  //     startBackFile,
  //     /* ts */ `
  //     import express from '${expressJsPath.split(path.sep).join("/")}'
  //     console.log("🚀 --> buildRoute --> express:", express);
  // //     const http = require("http");

  // // const host = 'localhost';
  // // const port = 8000;

  // // const requestListener = function (req, res) {};

  // // const server = http.createServer(requestListener);
  // // server.listen(port, host, () => {
  // //     console.log(\`Server is running on http://\${host}:\${port}\`);
  // // });

  //     `
  //   );
  // console.log("🚀 --> buildRoute --> __dirname:", __dirname);
};
