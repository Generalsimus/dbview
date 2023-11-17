import Joi from "joi";
import { MaxSchema, MaxType, MinSchema, MinType } from "./entities"


export const enum NumberValidateDataTypesEnums {
    Min = "Min",
    Max = "Max"
}

export const numberValidateEntitiesTypes: NumberValidateDataTypesEnums[] = [
    NumberValidateDataTypesEnums.Min,
    NumberValidateDataTypesEnums.Max,
]


interface NumberEntityValidationGeneric<T extends NumberValidateDataTypesEnums, V> {
    type: T,
    entity?: V
}

export type NumberMinLengthEntityType = NumberEntityValidationGeneric<NumberValidateDataTypesEnums.Min, MinType>;
export type NumberMaxLengthEntityType = NumberEntityValidationGeneric<NumberValidateDataTypesEnums.Max, MaxType>


export type NumberEntityValidationType = NumberMinLengthEntityType | NumberMaxLengthEntityType;



export const NumberEntityValidationSchema = {
    type: Joi.string().allow(...numberValidateEntitiesTypes),
    entity: Joi.when('type', {
        is: NumberValidateDataTypesEnums.Min,
        then: Joi.object(MinSchema),
        otherwise: Joi.when('type', {
            is: NumberValidateDataTypesEnums.Min,
            then: Joi.object(MaxSchema),

        }),
    }),
}