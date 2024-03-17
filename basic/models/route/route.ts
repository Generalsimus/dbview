import { RequestTypeEnum, requestMethods } from "@/basic/request";
import Joi from "joi";




export interface Route {
    name: string
    path: string
    description: string
    method: string
}

export const RouteSchema = Joi.object<Route>({
    name: Joi.string().required(),
    path: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    method: Joi.string().required(),
}) 