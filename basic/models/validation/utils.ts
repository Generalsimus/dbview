import { ValidateDataTypesEnums, validateDataTypes } from "./data-types";
import { NumberValidateDataTypesEnums, numberValidateEntitiesTypes } from "./data-types/number";
import { StringValidateDataTypesEnums, StringValidateEntitiesTypes } from "./data-types/string";


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

