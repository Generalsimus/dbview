import Joi from "joi";
import { MaxLengthSchema, MaxSchema, MaxType, MinLengthSchema, MinSchema, MinType } from "./entities"


export const enum StringValidateDataTypesEnums {
    MinLength = "MinLength",
    MaxLength = "MaxLength"
}

export const StringValidateEntitiesTypes: StringValidateDataTypesEnums[] = [
    StringValidateDataTypesEnums.MinLength,
    StringValidateDataTypesEnums.MaxLength,
]
interface StringEntityValidationGeneric<T extends StringValidateDataTypesEnums, V> {
    type: T,
    entity?: V
}

export type StringMinLengthEntityType = StringEntityValidationGeneric<StringValidateDataTypesEnums.MinLength, MinType>;
export type StringMaxLengthEntityType = StringEntityValidationGeneric<StringValidateDataTypesEnums.MaxLength, MaxType>


export type StringEntityValidationType = StringMinLengthEntityType | StringMaxLengthEntityType;


export const StringEntityValidationSchema = {
    type: Joi.string().allow(...StringValidateEntitiesTypes),
    entity: Joi.when('type', {
        is: StringValidateDataTypesEnums.MaxLength,
        then: Joi.object(MaxLengthSchema),
        otherwise: Joi.when('type', {
            is: StringValidateDataTypesEnums.MinLength,
            then: Joi.object(MinLengthSchema),
        }),
    }),
}

