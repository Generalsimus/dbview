import { MakeAsDbDoc } from "@/utils/db-basic-schema";
import { SyncJavaScript } from "./syncJavaScript";
import path from "path";
import { resolveOrInstallModule } from "@/utils/resolveOrInstallModule";
import { writeFileSync } from "@/utils/writeFileSync";
import { Route } from "@/db/types";

export function buildRoute(this: SyncJavaScript, route: MakeAsDbDoc<Route>) {
  console.log("🚀 --> buildRoute --> route:", route);
  console.log("🚀 --> buildRoute --> this:", this);
  if (!this.backEndDirectory) {
    console.warn("Backend Build Directory is not defined.");
    return;
  }

  const express = resolveOrInstallModule("express", this.backEndDirectory);

  const method = route.method.toLowerCase();
  const nicePath = `/${route.path}`.replace(/\'|\"|\\/gm, "\\$&");
  // route.validations.map((v) => this.buildValidation(v));
  const filePath = path.join(
    this.backEndDirectory,
    "routes",
    `${this.nameToFileName(route.name)}.js`
  );
  const routeFuncName = this.nameToFunctionName(route.name);
  console.log("🚀 --> buildRoute --> filePath:", filePath);
  writeFileSync(
    filePath,
    `
    export const ${routeFuncName} = (req, res) => {

    }
    `
  );
  // writeFileSync(
  //   path.join(this.backEndDirectory, "server.js"),
  //   `
  //   const express = require("express");

  //   const app = express();

  //   app.${method} ('${nicePath}', (req, res) => {
  //     console.log(req.query)
  //       res.send('Hello World!')
  //   })
  //   const port = 4000;
  //   app.listen(port, () => {
  //       console.log(\`app listening on port \${port}\`)
  //   })
  //   `
  // );
  // console.log("🚀 --> build\\R/oute --> express:", express);
}
