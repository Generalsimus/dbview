



// interface {

import Joi from "joi"
import { NumberValidationSchema, NumberValidationType } from "./number"
import { StringValidationSchema, StringValidationType } from "./string"
import { ObjectValidationSchema, ObjectValidationType } from "./object"



export const enum ValidateDataTypesEnums {
    String = "String",
    Number = "Number",
    Object = "Object"
}

export const validateDataTypes = [
    ValidateDataTypesEnums.Number,
    ValidateDataTypesEnums.String,
    ValidateDataTypesEnums.Object,
]

type ValidateValueTypeGen<T extends ValidateDataTypesEnums, V> = {
    type: T
    value: V
}


export type ValidateValueType = ValidateValueTypeGen<ValidateDataTypesEnums.String, StringValidationType> |
    ValidateValueTypeGen<ValidateDataTypesEnums.Number, NumberValidationType> |
    ValidateValueTypeGen<ValidateDataTypesEnums.Object, ObjectValidationType>
export const ValidateValueSchema = Joi.object({
    type: Joi.string().allow(...validateDataTypes).required(),
    schema: Joi.when('type', {
        is: ValidateDataTypesEnums.String,
        then: Joi.object(StringValidationSchema),
        otherwise: Joi.when('type', {
            is: ValidateDataTypesEnums.Number,
            then: Joi.object(NumberValidationSchema),
            otherwise: Joi.when('type', {
                is: ValidateDataTypesEnums.Object,
                then: Joi.object(ObjectValidationSchema),
            })
        })
    })
})
/////////////////////////////////////////////////////////

export interface ValidationPropertyType {
    property: string,
    schema: ValidateValueType
}
export const ValidationPropertySchema = Joi.object({
    property: Joi.string().required(),
    schema: ValidateValueSchema
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