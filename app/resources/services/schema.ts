import { GetKyselyModel } from "@/basic/generics";
import { ServiceMethodSchema } from "@/basic/models/services/services";
import { ValidationPropertySchema } from "@/basic/models/validation/validation";
import { Model, Service } from "@/db/types";
import Joi from "joi";

export const saveServiceSchema = Joi.object<GetKyselyModel<Service>>({
  name: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  methods: Joi.array().items(ServiceMethodSchema).default([]),

})

