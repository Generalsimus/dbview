import { JoiSchemaValue } from "@/basic/generics";
import Joi, { AnySchema } from "joi";

type ReturnDataTypeValue<V extends object> = ({
    [K in keyof V]: {
        type: K
        entities: Array<JoiSchemaValue<V[K]>>
    }

}[keyof V])
export const getDataTypeSchema = <V extends Record<any, AnySchema>>(entities: V): {
    types: (keyof V)[],
    schema: Joi.AnySchema<ReturnDataTypeValue<V>>
} => {
    const types: (keyof V)[] = Object.keys(entities);

    return {
        types: types,
        schema: Joi.object<ReturnDataTypeValue<V>>({
            type: Joi.string().valid(...types).required(),
            entities: Joi.when('type', {
                switch: types.map((type) => {
                    return {
                        is: String(type),
                        then: Joi.array().items(entities[type]).default([])
                    }
                }),

                otherwise: Joi.forbidden()
            }).default([]),
        })
    } as const
}







type ReturnEntityValue<V extends object> = ({
    [K in keyof V]: {
        type: K,
        entityValue: JoiSchemaValue<V[K]>
    }
}[keyof V])
export const getDataTypeEntitiesSchema = <V extends Record<any, AnySchema>>(entities: V): {
    types: (keyof V)[],
    schema: Joi.AnySchema<ReturnEntityValue<V>>
} => {
    // : {
    //     types: (keyof V)[],
    //     readonly schema: ReturnDataTypeValue<V>
    // }
    const types: (keyof V)[] = Object.keys(entities);

    return {
        types: types,
        schema: Joi.object<ReturnEntityValue<V>>({
            type: Joi.string().valid(...types).required(),
            entityValue: Joi.when("type", {
                switch: types.map((type) => {
                    return {
                        is: String(type),
                        then: entities[type],
                    }
                }),

                otherwise: Joi.forbidden()
            }),

        })
    } as const
};