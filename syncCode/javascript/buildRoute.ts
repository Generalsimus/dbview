import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { SyncJavaScript } from "./syncJavaScript";
import { Route } from "@/basic/models/route/route";
import resolve from "resolve/sync";
import path from "path";
import { resolveOrInstallModule } from "@/utils/resolveOrInstallModule";
import { writeFileSync } from "fs";

export function buildRoute(this: SyncJavaScript, route: MakeAsDbDoc<Route>) {
    console.log("🚀 --> buildRoute --> this:", this);
    if (!this.backEndDirectory) {
        console.warn("Backend Build Directory is not defined.")
        return;
    }
    if (!this.frontEndDirectory) {
        console.warn("FontEnd Build Directory is not defined.")
        return;
    }
    const express = resolveOrInstallModule("express", this.backEndDirectory);

    writeFileSync(path.join(this.backEndDirectory, "server.js"), /* ts */`
    const express = require("express");

    const app = express();
    
    app.${route.method.toLowerCase()} ('${route.path.replace(/\'|\"|\\/gm, "\\$&")}', (req, res) => {
        res.send('Hello World!')
    })
    const port = 4000;
    app.listen(port, () => {
        console.log(\`app listening on port \${port}\`)
    })
    `)
    console.log("🚀 --> build\\R/oute --> express:", express);

}