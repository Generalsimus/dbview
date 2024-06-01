import { GetKyselyModel } from "@/basic/generics";
import { ValidationPropertySchema } from "@/basic/models/validation/validation";
import { Model } from "@/db/types";
import Joi from "joi";

export const saveModelSchema = Joi.object<GetKyselyModel<Model>>({
  name: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  objectSchema: ValidationPropertySchema.default([]),
});
