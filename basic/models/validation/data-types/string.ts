import Joi from "joi";
import { MaxLengthSchema, MaxLengthType, MinLengthSchema, MinLengthType, OptionalValueSchema, OptionalValueType } from "./entities"


export const enum StringValidateDataTypesEnums {
    MinLength = "MinLength",
    MaxLength = "MaxLength",
    Optional = "Optional"
}

export const StringValidateEntitiesTypes: StringValidateDataTypesEnums[] = [
    StringValidateDataTypesEnums.MinLength,
    StringValidateDataTypesEnums.MaxLength,
    StringValidateDataTypesEnums.Optional,
]
interface StringEntityValidationGeneric<T extends StringValidateDataTypesEnums, V> {
    type: T,
    entity: V
}

export type StringMinLengthEntityType = StringEntityValidationGeneric<StringValidateDataTypesEnums.MinLength, MinLengthType>;
export type StringMaxLengthEntityType = StringEntityValidationGeneric<StringValidateDataTypesEnums.MaxLength, MaxLengthType>
export type StringOptionalEntityType = StringEntityValidationGeneric<StringValidateDataTypesEnums.Optional, OptionalValueType>


export type StringEntityValidationType = StringMinLengthEntityType | StringMaxLengthEntityType | StringOptionalEntityType;


export const StringEntityValidationSchema = Joi.object<StringEntityValidationType>({
    type: Joi.string().valid(...StringValidateEntitiesTypes).required(),
    entity: Joi.when("type", {
        switch: [
            {
                is: StringValidateDataTypesEnums.MaxLength,
                then: MaxLengthSchema.required()
            },
            {
                is: StringValidateDataTypesEnums.MinLength,
                then: MinLengthSchema.required()
            },
            {
                is: StringValidateDataTypesEnums.Optional,
                then: OptionalValueSchema.required()
            }
        ],

        otherwise: Joi.forbidden()
    }),

})

