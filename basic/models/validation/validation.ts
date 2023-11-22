



// interface {

import Joi from "joi"
import { ValidateValueSchema, ValidateValueType } from "./data-types"



export interface ValidationPropertyType {
    property: string,
    value: ValidateValueType
}
export const ValidationPropertySchema = Joi.object({
    property: Joi.string().required(),
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
