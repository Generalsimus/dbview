import { CreateObjectWithValue, GetObjectNestedValue } from "@/basic/generics"
import { validate } from "@/utils"
import Joi, { AnySchema, ValidationResult } from "joi"
import { Dispatch, SetStateAction } from "react"
import { error } from "console"

// interface State {
//   //   validation;
//   getError: (...path: strin[]) => void;
// }
export interface ValidationRes<S> {
    getError: (path: PropertyKey[]) => any
    getIfValid: () => S
    getPropValidation: <KEYS extends PropertyKey[]>(...propertyKeys: KEYS) => ValidationRes<GetObjectNestedValue<S, KEYS>>

}
interface Error {
    error: string,
    hasError: boolean
}
// interface RefCache<S> {
//     // controller?: ValidationRes<S>
//     validateResult: ValidationResult<S>,
// }
export const createValidationController = <S>(
    parentErrorPath: PropertyKey[],
    // prevControllerCache: RefCache<S>,
) => {
    // if (prevControllerCache) {
    //     return prevControllerCache;
    // }

    // const childPropControllers: { [K in keyof S]?: ValidationRes<S[K]> } = {};
    // 
    // const validateResult = prevControllerCache.validateResult
    // const getError = () => {

    // }
    // const controller = prevControllerCache.controller = {
    //     getError: (path) => {

    //     },
    //     getIfValid: (path) => {

    //     },
    //     getPropValidation: (...propertyKeys) => {
    //         // return 
    //     }

    // }


    // return controller;
};
