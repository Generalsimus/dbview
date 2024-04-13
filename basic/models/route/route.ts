import { RequestTypeEnum, requestMethods } from "@/basic/types";
import Joi from "joi";




export interface Route {
    name: string
    path: string
    method: RequestTypeEnum
    description: string
}

export const RouteSchema = Joi.object<Route>({
    name: Joi.string().required(),
    path: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    method: Joi.string().valid(...requestMethods).required(),
}) 