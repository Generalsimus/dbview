// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface UserSetting {
    buildDirection: string;
}

export const RouteSchema = Joi.object<UserSetting>({
    buildDirection: Joi.string().optional().default(""),
}) 