// interface {

import Joi from "joi";
import { PropertyType } from "@/app/components/object-input/types";
import { CreateObjectValidationSchema } from "@/app/components/object-input/utils";
import { DataTypes } from "./data-types";
// import { Validation } from "@/db/types";
// import { ValidateValueSchema, ValidateValueType } from "./data-types"

export type ValidationPropertyType = PropertyType[];
export const ValidationPropertySchema = CreateObjectValidationSchema(DataTypes);

/////////////////////////////////////////////////////////

// export interface Validation {
//     name: string
//     description: string
//     validations: ValidationPropertyType
// }

// export const ValidationSchema = Joi.object<Validation>({
//   name: Joi.string().required(),
//   description: Joi.string().allow("").default(""),
//   validations: ValidationPropertySchema.default([]) as any,
// }); 