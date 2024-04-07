import { CodeLanguagesEnum, RequestTypeEnum, codeLanguages, requestMethods } from "@/basic/types";
import Joi from "joi";




export interface ProjectSetting {
    backEndBuildDirection: string | null;
    backEndLanguage: CodeLanguagesEnum | null;
    frontEndBuildDirection: string | null;
}

export const ProjectSettingSchema = Joi.object<ProjectSetting>({
    backEndBuildDirection: Joi.string().optional().default(null),
    backEndLanguage: Joi.string().valid(...codeLanguages).default(null),
    frontEndBuildDirection: Joi.string().optional().default(null),
}) 