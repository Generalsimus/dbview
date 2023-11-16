import Joi from "joi";
import { MaxSchema, MaxType, MinSchema, MinType } from "./entities"


export const enum NumberValidateDataTypesEnums {
    Min = "Min",
    Max = "Max"
}
export const numberValidations: NumberValidateDataTypesEnums[] = [
    NumberValidateDataTypesEnums.Min,
    NumberValidateDataTypesEnums.Max,
]
export type NumberValidationTypes = MinType | MaxType;

export interface NumberValidationType {
    type: NumberValidateDataTypesEnums,
    entities?: NumberValidationTypes
}
export const NumberValidationSchema = {
    type: Joi.string().allow(...numberValidations),
    entities: Joi.array().items(Joi.when('type', {
        is: NumberValidateDataTypesEnums.Min,
        then: Joi.object(MinSchema),
        otherwise: Joi.when('type', {
            is: NumberValidateDataTypesEnums.Min,
            then: Joi.object(MaxSchema),

        }),
    })),
}