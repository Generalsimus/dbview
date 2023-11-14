import Joi, { AnySchema, ObjectSchema } from "joi"
import { DeepPartial, JoiSchemaValue, OptionalKeys } from "./generics"



interface BasicDbDocProps {
    id: number

    createdAt: Date

    updatedAt: Date

    deletedAt: Date | null
}


export type MakeAsDbDoc<M extends object> = M & BasicDbDocProps
export type MakeUpdate<M extends object> = MakeAsDbDoc<M>
export type MakeCreate<M extends object> = M


export type MakeCreateOrUpdate<M extends object> = MakeUpdate<M> | MakeCreate<M>

export type MakeForState<M extends object> = MakeUpdate<M> | DeepPartial<MakeCreate<M>>

///////////////////////////////////
const UpdateDocSchemaValues = {
    id: Joi.number().integer().required(),

    createdAt: Joi.any().strip(),

    updatedAt: Joi.any().strip(),

    deletedAt: Joi.any().strip(),

}

const CreateDocSchemaValues = {
    id: Joi.any().forbidden(),

    createdAt: Joi.any().forbidden(),

    updatedAt: Joi.any().forbidden(),

    deletedAt: Joi.any().forbidden(),
}



export const getCreateOrUpdateSchema = <S extends ObjectSchema>(defined: S): AnySchema<MakeCreateOrUpdate<JoiSchemaValue<S>>> => {

    return defined.when(Joi.object({ id: Joi.exist() }).unknown(), {
        then: Joi.object(UpdateDocSchemaValues),
        otherwise: Joi.object(CreateDocSchemaValues),
    })
}