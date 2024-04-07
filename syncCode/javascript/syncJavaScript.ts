import { SyncController } from "..";
import { buildRoute } from "./buildRoute";

export class SyncJavaScript implements SyncController {
    frontEndDirectory: SyncController["frontEndDirectory"]
    backEndDirectory: SyncController["backEndDirectory"]
    constructor(
        frontEndDirectory: SyncController["frontEndDirectory"],
        backEndDirectory: SyncController["backEndDirectory"]
    ) {
        this.frontEndDirectory = frontEndDirectory;
        this.backEndDirectory = backEndDirectory;

    }
    syncAll: () => {}
    syncDependencies: () => {}
    buildRoute = buildRoute
    // (route: MakeAsDbDoc<Route>) => {}
    buildValidation: () => {}
    buildService: () => {}
} 