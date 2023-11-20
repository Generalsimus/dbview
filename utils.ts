// import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber, ValidationError, validateSync } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/basic/request";
import { Children } from "react";
import { ClassToObject, ConvertPureType, DeepPartial, MakeStateValue } from "./basic/generics";
import { AnySchema, ObjectSchema, ValidationOptions, ValidationResult } from "joi";
import { RouteSchema } from "./basic/models/route/route";


// export const getValidationErrorToString = (errors: ValidationError[]) => {
// Routes
//     let errorStr = "";
//     for (const error of errors) {
//         if (error.constraints) {
//             errorStr = errorStr + Object.values(error.constraints).join("\n");
//         }
//         if (error.children) {
//             errorStr = errorStr + "\n" + getValidationErrorToString(error.children);
//         }
//     }

//     return errorStr.trim();
// }

// const validateErrorTo

export type ErrorsObject = Partial<{
    [key: string]: {
        error: string
        children: ErrorsObject

    }
}>;


// Record<string,>

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

// export function validate<T>(value: T, schema: TypedSchemaLike<T>): ValidationResult<T>;
export const validate = <V extends object>(value: any, schema: AnySchema<V>, options: ValidationOptions = {}): ValidationResult<V> => {

    return schema.validate(value, options)
}
// const validavalite = validate({}, PathSchema)

// if (!validavalite.error) {
//     const val = validavalite.value
// }
// export const safeStaring = (str: string) => {
//     return str
// }s
export const stringToRoutePath = (stringArg: string) => {

    return (`/${stringArg}/`).toLowerCase().trim().replace(/\s+/gm, "-").replace(/[^\w\-]+/gm, "/");
}