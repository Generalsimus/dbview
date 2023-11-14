



// interface {

import Joi from "joi"
import { NumberValidationSchema, NumberValidationType } from "./number"
import { StringValidationSchema, StringValidationType } from "./string"
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

const validateValueNames = [
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

export type ValidationBlockType = [string, ValidateValueType]
export const ValidationBlockSchema = Joi.array().ordered(Joi.string().required(), ValidateValueSchema.required())


export interface Validation {
    name: string
    validations: ValidationBlockType[]
}

export const ValidationSchema = Joi.object({
    name: Joi.string().required(),
    validations: Joi.array().items(ValidationBlockSchema),
})