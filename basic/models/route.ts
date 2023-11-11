// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface Route {
    name: string
    path: string
    description: string
    method: string
}

export const RouteSchema = Joi.object<Route>({
    name: Joi.string(),
    path: Joi.string(),
    description: Joi.string(),
    method: Joi.string(),
}) 