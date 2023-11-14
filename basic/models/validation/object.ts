import Joi from "joi";
import { MaxSchema, MaxType, MinSchema, MinType } from "./entities"
import { StringValidationSchema, StringValidationType } from "./string";
import { NumberValidationSchema, NumberValidationType } from "./number";


const enum ObjectValidationEnums {
}
const validations = [
]
export type NumberValidationTypes = MinType | MaxType;



export interface ObjectValidationType {
    key: StringValidationType | NumberValidationType,
    value: any
}
export const ObjectValidationSchema = {
    key: Joi.alternatives().try(
        Joi.object(StringValidationSchema),
        Joi.object(NumberValidationSchema)
    ),
    value: Joi.any()
}