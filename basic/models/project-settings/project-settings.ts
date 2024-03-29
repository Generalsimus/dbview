// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface ProjectSetting {
    buildDirection: string;
}

export const ProjectSettingSchema = Joi.object<ProjectSetting>({
    buildDirection: Joi.string().optional().default(""),
}) 