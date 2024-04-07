import { CodeLanguagesEnum } from "@/basic/types";
import { Route } from "@/basic/models/route/route";
import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { ProjectSetting } from "@/basic/models/project-settings/project-settings";
import { SyncJavaScript } from "./javascript/syncJavaScript";

export interface SyncController {
    frontEndDirectory?: string;
    backEndDirectory?: string;
    syncDependencies: (settings: MakeAsDbDoc<ProjectSetting>) => void;
    buildRoute: (route: MakeAsDbDoc<Route>) => void,
    buildValidation: () => void,
    buildService: () => void
}
export interface SyncControllerConstructor {
    new(frontEndDirectory: SyncController["frontEndDirectory"], backEndDirectory: SyncController["backEndDirectory"]): SyncController
}
export const languagesBuilder: Record<any, SyncControllerConstructor> = {
    [CodeLanguagesEnum.JavaScript]: SyncJavaScript,
    [CodeLanguagesEnum.TypeScript]: SyncJavaScript
}