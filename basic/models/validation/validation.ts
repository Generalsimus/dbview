



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
const enum ValidateValueTypes {
    String = "String",
    Number = "Number",
    Object = "Object"
}

export const validateValueNames = [
    ValidateValueTypes.Number,
    ValidateValueTypes.String,
    ValidateValueTypes.Object,
]

type ValidateValueTypeGen<T extends ValidateValueTypes, V> = {
    type: T
    value: V
}


export type ValidateValueType = ValidateValueTypeGen<ValidateValueTypes.String, StringValidationType> |
    ValidateValueTypeGen<ValidateValueTypes.Number, NumberValidationType> |
    ValidateValueTypeGen<ValidateValueTypes.Object, ObjectValidationType>
const ValidateValueSchema = Joi.object({
    type: Joi.string().allow(...validateValueNames).required(),
    schema: Joi.when('type', {
        is: ValidateValueTypes.String,
        then: Joi.object(StringValidationSchema),
        otherwise: Joi.when('type', {
            is: ValidateValueTypes.Number,
            then: Joi.object(NumberValidationSchema),
            otherwise: Joi.when('type', {
                is: ValidateValueTypes.Object,
                then: Joi.object(ObjectValidationSchema),
            })
        })
    })
})


export interface ValidationBlockType {
    name: string,
    schema: ValidateValueType
}
export const ValidationBlockSchema = Joi.object({
    name: Joi.string().required(),
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