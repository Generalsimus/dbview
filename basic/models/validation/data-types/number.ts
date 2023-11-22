import Joi from "joi";
import { MaxSchema, MaxType, MinSchema, MinType, OptionalValueSchema, OptionalValueType } from "./entities"


export const enum NumberValidateDataTypesEnums {
    Min = "Min",
    Max = "Max",
    Optional = "Optional",
}

export const NumberValidateEntitiesTypes: NumberValidateDataTypesEnums[] = [
    NumberValidateDataTypesEnums.Min,
    NumberValidateDataTypesEnums.Max,
    NumberValidateDataTypesEnums.Optional
]


interface NumberEntityValidationGeneric<T extends NumberValidateDataTypesEnums, V> {
    type: T,
    entity: V
}

export type NumberMinLengthEntityType = NumberEntityValidationGeneric<NumberValidateDataTypesEnums.Min, MinType>;
export type NumberMaxLengthEntityType = NumberEntityValidationGeneric<NumberValidateDataTypesEnums.Max, MaxType>
export type NumberOptionalEntityType = NumberEntityValidationGeneric<NumberValidateDataTypesEnums.Optional, OptionalValueType>





export type NumberEntityValidationType = NumberMinLengthEntityType | NumberMaxLengthEntityType | NumberOptionalEntityType;


export const NumberEntityValidationSchema = Joi.object<NumberEntityValidationType>({
    type: Joi.string().valid(...NumberValidateEntitiesTypes).required(),
    entity: Joi.when("type", {
        switch: [
            {
                is: NumberValidateDataTypesEnums.Max,
                then: MaxSchema.required()
            },
            {
                is: NumberValidateDataTypesEnums.Min,
                then: MinSchema.required()
            },
            {
                is: NumberValidateDataTypesEnums.Optional,
                then: OptionalValueSchema.required()
            },
        ]

    }),

});