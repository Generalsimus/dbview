import Joi from "joi"
import { NumberEntityValidationType, numberValidateEntitiesTypes } from "./number"
import { StringEntityValidationType, StringValidateEntitiesTypes } from "./string"




export const enum ValidateDataTypesEnums {
    String = "String",
    Number = "Number",
}

export const validateDataTypes = [
    ValidateDataTypesEnums.Number,
    ValidateDataTypesEnums.String,
]







export type ValidateValueTypeGen<T extends ValidateDataTypesEnums, V> = {
    type: T
    entities: V[]
}

export type StringDataTypeValidationType = ValidateValueTypeGen<ValidateDataTypesEnums.String, StringEntityValidationType>;
export type NumberDataTypeValidationType = ValidateValueTypeGen<ValidateDataTypesEnums.Number, NumberEntityValidationType>;

export type ValidateValueType = StringDataTypeValidationType | NumberDataTypeValidationType;

// |
// ValidateValueTypeGen<ValidateDataTypesEnums.Object, ObjectValidationType>
export const ValidateValueSchema = Joi.object({
    type: Joi.string().allow(...validateDataTypes).required(),
    entities: Joi.array().items(Joi.when('type', {
        is: ValidateDataTypesEnums.String,
        then: Joi.object(StringValidateEntitiesTypes),
        otherwise: Joi.when('type', {
            is: ValidateDataTypesEnums.Number,
            then: Joi.object(numberValidateEntitiesTypes)
        })
    }))
})
/////////////////////////////////////////////////////////