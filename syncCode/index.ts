import { MakeAsDbDoc } from "@/basic/db-basic-schema";
import { SyncJavaScript } from "./javascript/syncJavaScript";
import { ProjectSettings, Route    } from "@/db/types";



export interface SyncController {
    frontEndDirectory?: string;
    backEndDirectory?: string;
    syncDependencies: (settings: MakeAsDbDoc<ProjectSettings>) => void;
    buildRoute: (route: MakeAsDbDoc<Route>) => void;
    buildValidation: (validation: MakeAsDbDoc<null>) => void;
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
    // const settingsDoc = await client.projectSettings.findFirst({});

    // if (!settingsDoc) return;
    // const { frontEndBuildDirection, backEndBuildDirection } = settingsDoc;
    // if (!backEndBuildDirection) return;


    // const BuilderClass = settingsDoc.backEndLanguage ? languagesBuilder[settingsDoc.backEndLanguage] : undefined;
    // if (BuilderClass) {
    //     const builder = new BuilderClass(frontEndBuildDirection || undefined, backEndBuildDirection || undefined);

    //     return builder
    // }
};
