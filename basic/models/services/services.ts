import Joi from "joi"


interface ServiceMethod {
    name: string,
    descriptions: string,
    argValidationIds: number[],
    actionCode: string
}
export const ServiceMethodSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    argValidationIds: Joi.array().items(Joi.number()).default([]),
    actionCode: Joi.string().required(),
})




export interface Service {
    name: string
    description: string
    methods: ServiceMethod[]
}

export const ServiceSchema = Joi.object<Service>({
    name: Joi.string().required(),
    description: Joi.string().allow("").default(""),
    methods: Joi.array().items(ServiceMethodSchema).default([]),
    
})
