import { GetKyselyModel } from "@/basic/generics";
import { Service } from "@/db/types";
import Joi from "joi";


export interface ServiceMethod {
  name: string,
  description: string,
  argValidationIds: number[],
  actionCode: string
}
export const ServiceMethodSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  argValidationIds: Joi.array().items(Joi.number()).default([]),
  actionCode: Joi.string().allow("").required(),
})




export const saveServiceSchema = Joi.object<GetKyselyModel<Service>>({
  name: Joi.string().required(),
  description: Joi.string().allow("").default(""),
  methods: Joi.array().items(ServiceMethodSchema).default([]),

})

