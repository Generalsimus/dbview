// import { requestMethods } from "@/basic/types";
import Joi from "joi";
import { Route } from "@/db/types";




// export interface Route {
//     name: string
//     path: string
//     method: RequestTypeEnum
//     description: string,
//     validations: MakeAsDbDoc<Validation>[]
// }
export const requestMethods: Route["method"][] = ["GET", "POST", "DELETE", "PUT"];

export const RouteSchema = Joi.object<Route>({
    name: Joi.string().required(),
    path: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    method: Joi.string().valid(...requestMethods).required(),
    // validations: Joi.array().items(getDbDocSchema(ValidationSchema)).required(),
}) 