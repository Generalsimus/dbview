import Joi from "joi"
import { NumberEntityValidationSchema, NumberEntityValidationType, NumberValidateEntitiesTypes } from "./number"
import { StringEntityValidationSchema, StringEntityValidationType, StringValidateEntitiesTypes } from "./string"




export const enum ValidateDataTypesEnums {
    String = "String",
    Number = "Number",
    // EEEEE = "NumEer",
}

export const ValidateDataTypes = [
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

// interface ValidateValueType {
//     type: ValidateDataTypesEnums,
// }


export const ValidateValueSchema = Joi.object<ValidateValueType>({
    type: Joi.string().valid(...ValidateDataTypes).required(),
    entities: Joi.when('type', {
        switch: [
            {
                is: ValidateDataTypesEnums.Number,
                then: Joi.array().items(NumberEntityValidationSchema)
            },
            {
                is: ValidateDataTypesEnums.String,
                then: Joi.array().items(StringEntityValidationSchema),
            },
        ],
    }).default([]),
}); 