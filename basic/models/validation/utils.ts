// import { NumberValidationEnums, numberValidations } from "./number";
// import { StringValidationEnums, StringValidationType, stringValidations } from "./string";
// import { ValidateValueEnums, validateValueNames } from "./validation";

import { ValidateDataTypesEnums, validateDataTypes } from "./data-types";
import { NumberValidateDataTypesEnums, numberValidateEntitiesTypes } from "./data-types/number";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "./data-types/string";

// import { stringValidateDataTypes } from "./data-types/string";
// import { ValidateDataTypesEnums } from "./validation";



// // export type ValidateAllEnums = NumberValidationEnums | StringValidationEnums | ValidateValueEnums


// // export function getValidateHierarchy(type: ValidateValueEnums.String): StringValidationEnums[];
// // export function getValidateHierarchy(type: StringValidationEnums.Date): StringValidationEnums[];
// // export function getValidateHierarchy(type: StringValidationEnums.MinLength): StringValidationEnums[];

// export function getValidateHierarchy(type: ValidateValueEnums.Number): NumberValidationEnums[];
// export function getValidateHierarchy(type: NumberValidationEnums.Max): NumberValidationEnums[];
// export function getValidateHierarchy(type: NumberValidationEnums.Min): NumberValidationEnums[];
// export function getValidateHierarchy(type?: ValidateAllEnums | undefined): ValidateValueEnums[];
// export function getValidateHierarchy(type?: ValidateAllEnums) {
//     switch (type) {
//         case ValidateValueEnums.String:
//         case StringValidationEnums.Date:
//         case StringValidationEnums.MinLength:
//         case StringValidationEnums.MaxLength:
//             return stringValidations;
//         case ValidateValueEnums.Number:
//         case NumberValidationEnums.Max:
//         case NumberValidationEnums.Min:
//             return numberValidations;
//         default:
//             return validateValueNames;
//     }
// }
// const Default = "default" as const
interface DataTypeEntities {
    [ValidateDataTypesEnums.String]: StringValidateDataTypesEnums[]
    [ValidateDataTypesEnums.Number]: NumberValidateDataTypesEnums[]
}
export type DataTypeEntitiesGeneric<T extends (unknown | undefined)> = T extends ValidateDataTypesEnums ? DataTypeEntities[T] : ValidateDataTypesEnums[];


export function getDataTypeEntities(type: ValidateDataTypesEnums.String): StringValidateDataTypesEnums[];
export function getDataTypeEntities(type: ValidateDataTypesEnums.Number): NumberValidateDataTypesEnums[];
export function getDataTypeEntities(type?: ValidateDataTypesEnums | undefined) {
    switch (type) {
        case ValidateDataTypesEnums.String:
            return StringValidateEntitiesTypes;
        case ValidateDataTypesEnums.Number:
            return numberValidateEntitiesTypes
        default:
            return validateDataTypes;
    }
}

