import { NumberValidationEnums, numberValidations } from "./number";
import { StringValidationEnums, stringValidations } from "./string";
import { ValidateValueEnums, validateValueNames } from "./validation";



export type ValidateAllEnums = NumberValidationEnums | StringValidationEnums | ValidateValueEnums


export function getValidateHierarchy(type: ValidateValueEnums.String): StringValidationEnums[];
export function getValidateHierarchy(type: StringValidationEnums.Date): StringValidationEnums[];
export function getValidateHierarchy(type: StringValidationEnums.MinLength): StringValidationEnums[];

export function getValidateHierarchy(type: ValidateValueEnums.Number): NumberValidationEnums[];
export function getValidateHierarchy(type: NumberValidationEnums.Max): NumberValidationEnums[];
export function getValidateHierarchy(type: NumberValidationEnums.Min): NumberValidationEnums[];
export function getValidateHierarchy(type?: ValidateAllEnums | undefined): ValidateValueEnums[];
export function getValidateHierarchy(type?: ValidateAllEnums) {
    switch (type) {
        case ValidateValueEnums.String:
        case StringValidationEnums.Date:
        case StringValidationEnums.MinLength:
        case StringValidationEnums.MaxLength:
            return stringValidations;
        case ValidateValueEnums.Number:
        case NumberValidationEnums.Max:
        case NumberValidationEnums.Min:
            return numberValidations;
        default:
            return validateValueNames;
    }
}
