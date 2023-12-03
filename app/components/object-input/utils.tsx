import Joi, { ObjectSchema } from "joi";
import { PropertyNameViews, PropertyType } from "./types";



const validateProperty = <O extends PropertyType["propertyName"]>(propertyNameOptionalValue: O) => {
    return Joi.string().required()
}

const validatePropertyValue = <O extends PropertyType["value"]>(propertyNameOptionalValue: O) => {
    return Joi.string().required()
}


export const createPropertyValidationSchema = <O extends PropertyType>(propertyOptionalValue: O) => {
    return Joi.object<PropertyType>({
        propertyName: validateProperty(propertyOptionalValue.propertyName),
        value: validatePropertyValue(propertyOptionalValue.value),
    })
}



export const CreateObjectValidatioNSchema = <O extends PropertyType[]>(objectOptionalValue: O) => {
    return Joi.array<O>().items(...objectOptionalValue.map(createPropertyValidationSchema))
} 