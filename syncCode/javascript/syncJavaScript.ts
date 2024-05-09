import { SyncController } from "..";
import { buildRoute } from "./buildRoute";
import { buildValidation } from "./buildValidation";

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
    buildValidation = buildValidation
    buildService: () => {}
} 