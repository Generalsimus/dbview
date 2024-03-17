// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface User {
    userName: string,
    password: string
}

export const RouteSchema = Joi.object<User>({
    userName: Joi.string().required(),
    password: Joi.string().required()
}) 