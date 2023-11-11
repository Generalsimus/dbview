import Joi, { ObjectSchema } from "joi"
import { JoiSchemaValue, OptionalKeys } from "./generics"



interface BasicDbDocProps {
    id: number

    createdAt: Date

    updatedAt: Date

    deletedAt: Date | undefined
}


export type ExtendDbKeys<M extends object> = M & BasicDbDocProps
export type PartialDbKeys<M extends object> = OptionalKeys<M, keyof BasicDbDocProps>

///////////////////////////////////
const BasicDbDocRequiredSchema = {
    id: Joi.number().integer().required(),

    createdAt: Joi.date().required(),

    updatedAt: Joi.date().required(),

    deletedAt: Joi.date().required(),
}

const BasicDbDocOptionsSchema = {
    id: Joi.number().integer().optional(),

    createdAt: Joi.date().optional(),

    updatedAt: Joi.date().optional(),

    deletedAt: Joi.date().optional(),
}



export const getDbDocKeysSchema = <S extends ObjectSchema>(defined: S): ObjectSchema<ExtendDbKeys<JoiSchemaValue<S>>> => {
    return defined.keys(BasicDbDocRequiredSchema)
}
export const partialDbKeySchema = <S extends ObjectSchema>(defined: S): ObjectSchema<PartialDbKeys<ExtendDbKeys<JoiSchemaValue<S>>>> => {
    return defined.keys(BasicDbDocOptionsSchema);
}

