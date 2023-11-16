import Joi from "joi";
import { MaxLengthSchema, MaxLengthType, MinLengthSchema, MinLengthType } from "./entities"


export const enum StringValidateDataTypesEnums {
    MinLength = "MinLength",
    MaxLength = "MaxLength",
    Date = "Date"
}
export const stringValidateDataTypes: StringValidateDataTypesEnums[] = [
    StringValidateDataTypesEnums.MinLength,
    StringValidateDataTypesEnums.MaxLength,
    StringValidateDataTypesEnums.Date,
]
export type StringValidationTypes = MinLengthType | MaxLengthType

export interface StringValidationType {
    type: StringValidateDataTypesEnums,
    entities: StringValidationTypes
}
export const StringValidationSchema = {
    type: Joi.string().allow(...stringValidateDataTypes),
    entities: Joi.array().items(Joi.when('type', {
        is: StringValidateDataTypesEnums.MaxLength,
        then: Joi.object(MaxLengthSchema),
        otherwise: Joi.when('type', {
            is: StringValidateDataTypesEnums.MinLength,
            then: Joi.object(MinLengthSchema),
        }),
    })),
}

/**
 * 
 * 
 */