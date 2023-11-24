import Joi from "joi";
import { EntityValidationEnums, EntityValidationGeneric, MaxSchema, MaxType, MinSchema, MinType, OptionalValueSchema, OptionalValueType } from "./entities"



export const NumberValidateEntitiesTypes = [
    EntityValidationEnums.Min,
    EntityValidationEnums.Max,
    EntityValidationEnums.Optional
] as const


export type NumberValidateDataTypes = (typeof NumberValidateEntitiesTypes)[number]


export type NumberMinEntityType = EntityValidationGeneric<EntityValidationEnums.Min, MinType>;
export type NumberMaxEntityType = EntityValidationGeneric<EntityValidationEnums.Max, MaxType>
export type NumberOptionalEntityType = EntityValidationGeneric<EntityValidationEnums.Optional, OptionalValueType>



export type NumberEntityValidationType = NumberMinEntityType | NumberMaxEntityType | NumberOptionalEntityType;


export const NumberEntityValidationSchema = Joi.object<NumberEntityValidationType>({
    type: Joi.string().valid(...NumberValidateEntitiesTypes).required(),
    entity: Joi.when("type", {
        switch: [
            {
                is: EntityValidationEnums.Max,
                then: MaxSchema.required()
            },
            {
                is: EntityValidationEnums.Min,
                then: MinSchema.required()
            },
            {
                is: EntityValidationEnums.Optional,
                then: OptionalValueSchema.required()
            },
        ]

    }),

});