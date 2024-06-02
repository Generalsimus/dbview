import { GetObjectNestedValue } from "@/utils/generics"

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
