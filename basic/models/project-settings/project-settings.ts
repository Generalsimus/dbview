import { ProjectSettings } from "@/db/types";
import Joi from "joi";




// export interface ProjectSetting {
//     backEndBuildDirection: string | null;
//     backEndLanguage: CodeLanguagesEnum | null;
//     frontEndBuildDirection: string | null;
// }
export const codeLanguages: Exclude<ProjectSettings["backEndLanguage"], null>[] = ['TypeScript', 'JavaScript']

export const ProjectSettingSchema = Joi.object<ProjectSettings>({
    backEndBuildDirection: Joi.string().optional().default(null),
    backEndLanguage: Joi.string().valid(...codeLanguages).default(null),
    frontEndBuildDirection: Joi.string().optional().default(null),
}) 