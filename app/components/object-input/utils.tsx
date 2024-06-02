import Joi, { AnySchema, ObjectSchema } from "joi";
import { InputTypes, PropertyNameViews, PropertyNameViewsValue, PropertyType, ValueTypes } from "./types";
import { DeepPartial, ValueOf } from "@/utils/generics";


const createInputValuesValidation = () => {
    return Joi.array().items(Joi.object({
        type: Joi.any().valid(InputTypes.String, InputTypes.Number, InputTypes.Select).required(),
        value: Joi.when('type', {
            switch: [
                {
                    is: String(InputTypes.String),
                    then: Joi.string().required()
                },
                {
                    is: String(InputTypes.Number),
                    then: Joi.number().required()
                },
                {
                    is: String(InputTypes.Select),
                    then: Joi.alternatives(Joi.number(), Joi.string()).required()
                }
            ],
        })
    })).default([])
}




const validatePropertyValue = <O extends PropertyNameViews>(optionalValue: O) => {
    const idKey = `SCHEMA_LINK_ID_NAME_`;

    
    return Joi.object<PropertyNameViewsValue<O>>({
        name: Joi.string().required(),
        argValues: createInputValuesValidation().optional(),
        argProperties: Joi.link<PropertyNameViewsValue<O>>(`#${idKey}`).optional(),
        properties: Joi.link<PropertyNameViewsValue<O>>(`#${idKey}`).optional()
    }).id(idKey);

}


export const createPropertyValidationSchema = <O extends PropertyNameViews>(optionalValue: O) => {
    return Joi.object<PropertyType>({
        propertyName: Joi.string().required(),
        value: validatePropertyValue(optionalValue),
    })
}



export const CreateObjectValidationSchema = <O extends PropertyNameViews>(optionalValue: O) => {
    return Joi.array<PropertyType<O>[]>().items(createPropertyValidationSchema(optionalValue))
} 