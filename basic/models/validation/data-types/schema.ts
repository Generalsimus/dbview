import Joi, { AnySchema, ObjectSchema } from "joi";
import { getDataTypeEntitiesSchema, getDataTypeSchema } from "./scheam-generators";
import { EntityValidateEnums, ValidateDataTypesEnums } from "./enums";
import { DeepUnion, ExtractTypeWithProp, JoiSchemaValue, ValueOf } from "@/basic/generics";






//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const { types: NumberValidateEntitiesTypes, schema: NumberEntityValidationSchema } = getDataTypeEntitiesSchema(
    {
        [EntityValidateEnums.Max]: Joi.number<number>().required(),
        [EntityValidateEnums.Min]: Joi.number<number>().required(),
        [EntityValidateEnums.Optional]: Joi.any<undefined>().strip(),

        // [EntityValidateEnums.Or]: Joi.link<ReturnType<() => ValidateValueType>>("#GradedItemGroupSchema") as AnySchema<OrInterface<ValidateValueType>>,
        // [EntityValidateEnums.Or]: Joi.any<undefined>().strip(),
    }
    //  as const
);

export type NumberEntityValidationType = JoiSchemaValue<typeof NumberEntityValidationSchema>
export type NumberValidateEntitiesTypes = NumberEntityValidationType["type"]

type OrInterface = {
    value: ValidateValueType
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const { types: StringValidateEntitiesTypes, schema: StringEntityValidationSchema } = getDataTypeEntitiesSchema(
    {
        [EntityValidateEnums.MaxLength]: Joi.number<number>().required(),
        [EntityValidateEnums.MinLength]: Joi.number<number>().required(),
        [EntityValidateEnums.Regex]: Joi.string<string>().required(),
        [EntityValidateEnums.Optional]: Joi.any<undefined>().strip(),
        // [EntityValidateEnums.Or]: Joi.any<undefined>().strip(),

        [EntityValidateEnums.Or]: Joi.link("#GradedItemGroupSchema").required() as AnySchema<ValidateValueType>,
    } 
)

export type StringEntityValidationType = JoiSchemaValue<typeof StringEntityValidationSchema>
export type StringValidateEntitiesTypes = StringEntityValidationType["type"]
type ss = ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.Or>

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const { types: ValidateDataTypes, schema: ValidateValueSchema } = getDataTypeSchema(
    {
        [ValidateDataTypesEnums.String]: StringEntityValidationSchema,
        [ValidateDataTypesEnums.Number]: NumberEntityValidationSchema,
    } as const
);

ValidateValueSchema.id("GradedItemGroupSchema");
export type ValidateValueType = JoiSchemaValue<typeof ValidateValueSchema>

// const eeee: ValidateValueType = {
//     type: ValidateDataTypesEnums.String,
//     entities: [],

// }