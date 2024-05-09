import { getDbDocSchema, MakeAsDbDoc } from "@/basic/db-basic-schema";
import { RequestTypeEnum, requestMethods } from "@/basic/types";
import Joi from "joi";
import { Validation, ValidationSchema } from "../validation/validation";




export interface Route {
    name: string
    path: string
    method: RequestTypeEnum
    description: string,
    validations: MakeAsDbDoc<Validation>[]
}

export const RouteSchema = Joi.object<Route>({
    name: Joi.string().required(),
    path: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    method: Joi.string().valid(...requestMethods).required(),
    validations: Joi.array().items(getDbDocSchema(ValidationSchema)).required(),
}) 