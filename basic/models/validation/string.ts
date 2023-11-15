import Joi from "joi";
import { MaxLengthSchema, MaxLengthType, MinLengthSchema, MinLengthType } from "./entities"


const enum StringValidationEnums {
    MinLength = "MinLength",
    MaxLength = "MaxLength",
    Date = "Date"
}
export const stringValidations = [
    StringValidationEnums.MinLength,
    StringValidationEnums.MaxLength,
    StringValidationEnums.Date,
]
export type StringValidationTypes = MinLengthType | MaxLengthType

export interface StringValidationType {
    type: StringValidationEnums,
    schema: StringValidationTypes
}
export const StringValidationSchema = {
    type: Joi.string().allow(...stringValidations),
    schema: Joi.when('type', {
        is: StringValidationEnums.MaxLength,
        then: Joi.object(MaxLengthSchema),
        otherwise: Joi.when('type', {
            is: StringValidationEnums.MinLength,
            then: Joi.object(MinLengthSchema),
        }),
    }),
}