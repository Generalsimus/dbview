import Joi from "joi";
import { MaxSchema, MaxType, MinSchema, MinType } from "./entities"


const enum NumberValidationEnums {
    Min = "Min",
    Max = "Max"
}
const validations = [
    NumberValidationEnums.Min,
    NumberValidationEnums.Max,
]
export type NumberValidationTypes = MinType | MaxType;

export interface NumberValidationType {
    key: NumberValidationEnums,
    schema: NumberValidationTypes
}
export const NumberValidationSchema = {
    type: Joi.string().allow(...validations),
    schema: Joi.when('type', {
        is: NumberValidationEnums.Min,
        then: Joi.object(MinSchema),
        otherwise: Joi.when('type', {
            is: NumberValidationEnums.Min,
            then: Joi.object(MaxSchema),

        }),
    }),
}