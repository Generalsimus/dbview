



// interface {

import Joi from "joi"
import { ValidateValueSchema, ValidateValueType } from "./data-types"



export interface ValidationPropertyType {
    property: string,
    value: ValidateValueType
}
export const ValidationPropertySchema = Joi.object({
    property: Joi.string().required(),
    value: ValidateValueSchema
})

/////////////////////////////////////////////////////////

export interface Validation {
    name: string
    description: string
    validations: ValidationPropertyType[]
}

export const ValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    validations: Joi.array().items(ValidationPropertySchema),
})
 