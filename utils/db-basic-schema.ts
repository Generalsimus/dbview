import Joi, { AnySchema, ObjectSchema } from "joi";
import { JoiSchemaValue, PartialBy, UnionProperties } from "./generics";

interface BasicDbDocProps {
  id: number;

  createdAt: string;

  updatedAt: string;

  deletedAt: string | null;
}

export type MakeAsDbDoc<M extends any> = Omit<M, keyof BasicDbDocProps> &
  BasicDbDocProps;
export type MakeUpdate<M extends any> = MakeAsDbDoc<M>;
export type MakeCreate<M extends any> = Omit<M, keyof BasicDbDocProps>;

export type MakeCreateOrUpdate<M extends any> = PartialBy<
  MakeAsDbDoc<M>,
  keyof BasicDbDocProps
>;

// export type PickDbId<M extends any> = Omit<
//   MakeAsDbDoc<M>,
//   Exclude<keyof BasicDbDocProps, "id">
// >;
//  MakeUpdate<M> | MakeCreate<M>

///////////////////////////////////
const UpdateDocSchemaValues = {
  id: Joi.number().integer().required(),

  createdAt: Joi.any().strip(),

  updatedAt: Joi.any().strip(),

  deletedAt: Joi.any().strip(),
};

const CreateDocSchemaValues = {
  id: Joi.any().forbidden(),

  createdAt: Joi.any().forbidden(),

  updatedAt: Joi.any().forbidden(),

  deletedAt: Joi.any().forbidden(),
};

export const getCreateOrUpdateSchema = <S extends AnySchema>(
  defined: S
): AnySchema<MakeCreateOrUpdate<JoiSchemaValue<S>>> => {
  return defined.when(Joi.object({ id: Joi.exist() }).unknown(), {
    then: Joi.object(UpdateDocSchemaValues),
    otherwise: Joi.object(CreateDocSchemaValues),
  });
};

export const getDbDocSchema = <S extends ObjectSchema>(
  defined: S
): AnySchema<MakeAsDbDoc<JoiSchemaValue<S>>> => {
  return defined.append({
    id: Joi.number().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    deletedAt: Joi.date().allow(null).required(),
  });
};
