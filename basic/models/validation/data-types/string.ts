import Joi from "joi";
import { EntityValidationEnums, EntityValidationGeneric, MaxLengthSchema, MaxLengthType, MinLengthSchema, MinLengthType, OptionalValueSchema, OptionalValueType, RegexSchema, RegexType } from "./entities"




export const StringValidateEntitiesTypes = [
    EntityValidationEnums.MinLength,
    EntityValidationEnums.MaxLength,
    EntityValidationEnums.Optional,
    EntityValidationEnums.Regex,
] as const

export type StringValidateDataTypes = (typeof StringValidateEntitiesTypes)[number]


export type StringMinLengthEntityType = EntityValidationGeneric<EntityValidationEnums.MinLength, MinLengthType>;
export type StringMaxLengthEntityType = EntityValidationGeneric<EntityValidationEnums.MaxLength, MaxLengthType>
export type StringRegexEntityType = EntityValidationGeneric<EntityValidationEnums.Regex, RegexType>
export type StringOptionalEntityType = EntityValidationGeneric<EntityValidationEnums.Optional, OptionalValueType>



export type StringEntityValidationType = StringMinLengthEntityType | StringMaxLengthEntityType | StringRegexEntityType | StringOptionalEntityType;


export const StringEntityValidationSchema = Joi.object<StringEntityValidationType>({
    type: Joi.string().valid(...StringValidateEntitiesTypes).required(),
    entity: Joi.when("type", {
        switch: [
            {
                is: EntityValidationEnums.MaxLength,
                then: MaxLengthSchema.required()
            },
            {
                is: EntityValidationEnums.MinLength,
                then: MinLengthSchema.required()
            },
            {
                is: EntityValidationEnums.Regex,
                then: RegexSchema.required()
            },
            {
                is: EntityValidationEnums.Optional,
                then: OptionalValueSchema.required()
            }

        ],

        otherwise: Joi.forbidden()
    }),

})

