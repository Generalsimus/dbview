



// interface {

import Joi from "joi"
import { ValidateValueSchema, ValidateValueType } from "./data-types/schema"
import { PropertyType } from "@/app/components/object-input/types";
// import { ValidateValueSchema, ValidateValueType } from "./data-types"



export type ValidationPropertyType = PropertyType;
export const ValidationPropertySchema = Joi.object<ValidationPropertyType>({
    propertyName: Joi.string().required(),
    value: ValidateValueSchema.required()
})

/////////////////////////////////////////////////////////

export interface Validation {
    name: string
    description: string
    validations: ValidationPropertyType[]
}

export const ValidationSchema = Joi.object<Validation>({
    name: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    validations: Joi.array().items(ValidationPropertySchema).default([]),
})
