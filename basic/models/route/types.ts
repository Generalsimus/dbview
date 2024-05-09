// import Joi, { ObjectSchema } from "joi"
// import { Route, RouteSchema } from "./route"
// import { Validation, ValidationSchema } from "../validation/validation"
// import { getDbDocSchema, MakeAsDbDoc } from "@/basic/db-basic-schema"

// export interface SaveRoute extends Route {
//     validations: MakeAsDbDoc<Validation>[]
// }


// export const SaveRouteSchema = RouteSchema.append<SaveRoute>({
//     validations: Joi.array().items(getDbDocSchema(ValidationSchema)).required(),
// })
// Joi.object<SaveRoute>({
// }).keys(RouteSchema)

/////////////////////////////////////////////////
// export interface GetRoute extends Route {
//     validations: MakeAsDbDoc<Validation>[]
// }


// export const GetRouteSchema = RouteSchema.append<SaveRoute>({
// })
