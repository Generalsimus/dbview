import { SyncController } from "..";
import { buildRoute } from "./buildRoute";
import { buildValidation } from "./buildValidation";
import { nameToFileName } from "./nameToFileName";
import { nameToFunctionName } from "./nameToFunctionName";

export class SyncJavaScript implements SyncController {
  frontEndDirectory: SyncController["frontEndDirectory"];
  backEndDirectory: SyncController["backEndDirectory"];
  constructor(
    frontEndDirectory: SyncController["frontEndDirectory"],
    backEndDirectory: SyncController["backEndDirectory"]
  ) {
    this.frontEndDirectory = frontEndDirectory;
    this.backEndDirectory = backEndDirectory;
  }
  syncAll: () => {};
  syncDependencies: () => {};
  nameToFileName = nameToFileName;
  nameToFunctionName = nameToFunctionName;
  buildRoute = buildRoute;
  buildValidation = buildValidation;
  buildService: () => {};
  //   (name: string) => {
  //     return name
  //   };
}
