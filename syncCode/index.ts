import { MakeAsDbDoc } from "@/utils/db-basic-schema";
import { SyncJavaScript } from "./javascript/syncJavaScript";
import { Model, ProjectSettings, Route } from "@/db/types";
import { db } from "@/db/init";
import { GetKyselyModel } from "@/utils/generics";



export interface SyncController {
    frontEndDirectory?: string;
    backEndDirectory?: string;
    syncDependencies: (settings: GetKyselyModel<ProjectSettings>) => void;
    buildRoute: (route: GetKyselyModel<Route>) => void;
    buildValidation: (model: GetKyselyModel<Model>) => void;
    buildService: () => void;
}
export interface SyncControllerConstructor {
    new(
        frontEndDirectory: SyncController["frontEndDirectory"],
        backEndDirectory: SyncController["backEndDirectory"]
    ): SyncController;
}
export const languagesBuilder = {
    "JavaScript": SyncJavaScript,
    "TypeScript": SyncJavaScript,
} as const;


export const getBuilder = async () => {
    const settingsDoc = await db.selectFrom("ProjectSettings")
        .selectAll()
        .executeTakeFirst();

    if (!settingsDoc) return;
    const { frontEndBuildDirection, backEndBuildDirection, backEndLanguage } = settingsDoc;
    if (!backEndBuildDirection) return;
    // 

    const BuilderClass = backEndLanguage ? languagesBuilder[backEndLanguage] : undefined;
    if (BuilderClass) {
        const builder = new BuilderClass(frontEndBuildDirection || undefined, backEndBuildDirection || undefined);

        return builder
    }
};
