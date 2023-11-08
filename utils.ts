import { Allow, IsDate, IsEmpty, IsEnum, IsIn, IsNumber, IsString, MinLength, isDate, isNumber, ValidationError } from "class-validator";
import { RequestTypeEnum, requestMethods } from "@/types/request";




export const getValidationErrorToString = (errors: ValidationError[]) => {
    let errorStr = "";
    for (const error of errors) {
        if (error.constraints) {
            errorStr = errorStr + Object.values(error.constraints).join("\n");
        }
        if (error.children) {
            errorStr = errorStr + "\n" + getValidationErrorToString(error.children);
        }
    }

    return errorStr.trim();
}


export const safeStaring = (str: string) => {
    return str
}