// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface ProjectSetting {
    backEndBuildDirection: string | null;
    frontEndBuildDirection: string | null;
}

export const ProjectSettingSchema = Joi.object<ProjectSetting>({
    backEndBuildDirection: Joi.string().optional().default(null),
    frontEndBuildDirection: Joi.string().optional().default(null),
}) 