import Joi, { AnySchema, ObjectSchema } from "joi";
import { getDataTypeEntitiesSchema, getDataTypeSchema } from "./scheam-generators";
import { EntityValidateEnums, ValidateDataTypesEnums } from "./enums";
import { DeepUnion, ExtractTypeWithProp, JoiSchemaValue, ValueOf } from "@/utils/generics";






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





// export interface B {
//     propA: A;
// }

// export interface A {
//     propB: B;
// }





interface OrInterface {
    value: ValidateValueType
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const { types: StringValidateEntitiesTypes, schema: StringEntityValidationSchema } = getDataTypeEntitiesSchema(
    {
        [EntityValidateEnums.MaxLength]: Joi.number<number>().required(),
        [EntityValidateEnums.MinLength]: Joi.number<number>().required(),
        [EntityValidateEnums.Regex]: Joi.string<string>().required(),
        [EntityValidateEnums.Optional]: Joi.any<undefined>().strip(),


        [EntityValidateEnums.Or]: Joi.object<OrInterface>({
            value: Joi.link("#GradedItemGroupSchema").required()
        }).required()

    } as const
)

export type StringEntityValidationType = JoiSchemaValue<typeof StringEntityValidationSchema>
export type StringValidateEntitiesTypes = StringEntityValidationType["type"]
// type ss = ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.Or>

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const { types: ValidateDataTypes, schema: ValidateValue } = getDataTypeSchema(
    {
        [ValidateDataTypesEnums.String]: StringEntityValidationSchema,
        [ValidateDataTypesEnums.Number]: NumberEntityValidationSchema,
    } as const
);

export const ValidateValueSchema = ValidateValue.id("GradedItemGroupSchema");
// ValidateValueSchema
export type ValidateValueType = JoiSchemaValue<typeof ValidateValueSchema>

// const eeee: ValidateValueType = {
//     type: ValidateDataTypesEnums.String,
//     entities: [],

// }