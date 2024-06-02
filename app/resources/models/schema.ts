import { ValidationPropertySchema } from "@/app/components/object-input/schema/validation";
import { GetKyselyModel } from "@/utils/generics";
import { Model } from "@/db/types";
import Joi from "joi";

export const saveModelSchema = Joi.object<GetKyselyModel<Model>>({
  name: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  objectSchema: ValidationPropertySchema.default([]),
});
