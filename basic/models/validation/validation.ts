



// interface {

import Joi from "joi"
import { NumberValidationSchema, NumberValidationType, numberValidations } from "./number"
import { StringValidationSchema, StringValidationType, stringValidations } from "./string"
import { ObjectValidationSchema, ObjectValidationType } from "./object"




// const ArrayValidations = [
//     "MaxLength",
//     "MinLength",
//     "Default"
// ] as const
export const enum ValidateValueEnums {
    String = "String",
    Number = "Number",
    Object = "Object"
}

export const validateValueNames = [
    ValidateValueEnums.Number,
    ValidateValueEnums.String,
    ValidateValueEnums.Object,
]

type ValidateValueTypeGen<T extends ValidateValueEnums, V> = {
    type: T
    value: V
}


export type ValidateValueType = ValidateValueTypeGen<ValidateValueEnums.String, StringValidationType> |
    ValidateValueTypeGen<ValidateValueEnums.Number, NumberValidationType> |
    ValidateValueTypeGen<ValidateValueEnums.Object, ObjectValidationType>
export const ValidateValueSchema = Joi.object({
    type: Joi.string().allow(...validateValueNames).required(),
    schema: Joi.when('type', {
        is: ValidateValueEnums.String,
        then: Joi.object(StringValidationSchema),
        otherwise: Joi.when('type', {
            is: ValidateValueEnums.Number,
            then: Joi.object(NumberValidationSchema),
            otherwise: Joi.when('type', {
                is: ValidateValueEnums.Object,
                then: Joi.object(ObjectValidationSchema),
            })
        })
    })
})


export interface ValidationBlockType {
    property: string,
    schema: ValidateValueType
}
export const ValidationBlockSchema = Joi.object({
    property: Joi.string().required(),
    schema: ValidateValueSchema.required(),
})


export interface Validation {
    name: string
    description: string
    validations: ValidationBlockType[]
}

export const ValidationSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    validations: Joi.array().items(ValidationBlockSchema),
})