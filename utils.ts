import { AnySchema, ValidationOptions, ValidationResult } from "joi";


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


export const validate = <V extends any>(value: any, schema: AnySchema<V>, options: ValidationOptions = { stripUnknown: true, abortEarly: true }): ValidationResult<V> => {
    const res = schema.validate(value, options);
    if (res.error) [
        console.log(res.error)
    ]
    return res;
}


export const stringToRoutePath = (stringArg: string | number) => {

    return (`/${stringArg}/`).toLowerCase().trim().replace(/\s+/gm, "-").replace(/[^\w\-]+/gm, "/");
}


