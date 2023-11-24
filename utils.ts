// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber, ValidationError, validateSync } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import { Children } from "react";
// import { ClassToObject, DeepPartial, MakeStateValue } from "./basic/generics";
import Joi, { AnySchema, ObjectSchema, ValidationOptions, ValidationResult, any } from "joi";
import { RouteSchema } from "./basic/models/route/route";
import { mapValues } from "lodash";


export type ErrorsObject = Partial<{
    [key: string]: {
        error: string
        children: ErrorsObject

    }
}>;



export const validateErrorToObject = (errors: any[]): ErrorsObject => {
    const obj: ErrorsObject = {}

    for (const error of errors) {
        obj[error.property] = {
            error: Object.values(error.constraints || {}).join("\n"),
            children: validateErrorToObject(error.children || [])
        }
    }
    return obj;
}


export const validate = <V extends object>(value: any, schema: AnySchema<V>, options: ValidationOptions = { stripUnknown: true, abortEarly: true }): ValidationResult<V> => {
    const res = schema.validate(value, options);
    if (res.error) [
        console.log(res.error)
    ]
    return res;
}


export const stringToRoutePath = (stringArg: string) => {

    return (`/${stringArg}/`).toLowerCase().trim().replace(/\s+/gm, "-").replace(/[^\w\-]+/gm, "/");
} 