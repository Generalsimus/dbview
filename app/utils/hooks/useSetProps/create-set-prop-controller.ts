import { CreateObjectWithValue, GetObjectNestedValue } from "@/basic/generics"
import { validate, validateErrorToObject } from "@/utils"
import Joi, { AnySchema, ValidationResult } from "joi"
import { Dispatch, SetStateAction } from "react"
import { IndexedDBController } from "../../indexedDb"
import { Anybody } from "next/font/google"
// import { ValidationRes } from "./create-validation-controller"
type Error = {
    error: true,
    helperText: string | undefined,
} | {
    error: false,
    helperText: undefined,
}
export interface ValidationRes<S> {
    getError: (...path: PropertyKey[]) => Error
    getIfValid: (effectErrorView?: boolean) => S
    // getPropValidation: <KEYS extends PropertyKey[]>(...propertyKeys: KEYS) => ValidationRes<GetObjectNestedValue<S, KEYS>> 
}
export interface SetPropsRes<S> {
    value: S
    setValue: (newValueOrAction: SetStateAction<S>) => S,
    setProps: <SetPropKeys extends PropertyKey[]>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void
    initSetProps: <InitialKeys extends PropertyKey[]>(
        ...initialValueKeys: InitialKeys
    ) => <SetPropKeys extends readonly PropertyKey[]>(
        ...setPropKeys: SetPropKeys
    ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void
    getPropState: <KEYS extends readonly PropertyKey[]>(...propertyKeys: KEYS) => SetPropsRes<GetObjectNestedValue<S, KEYS>>
    getValidation: <D>(schema?: AnySchema<D>) => ValidationRes<D>
}
// type PropKeysGeneric<O extends any> = O extends object ? ({ [K in keyof O]: [K, ...PropKeysGeneric<O[K]>] | [K] | [] }[keyof O]) : any[]



export const createSetPropController = <S extends any>(
    state: S,
    onChangeState: (newSTate: S) => void,
    cacheUniqId: string,
    prevController?: SetPropsRes<S>,
    pathHierarchy: PropertyKey[] = [],
) => {
    if (prevController) {
        prevController.value = state;
        return prevController;
    }
    // const controllerId = pathHierarchy.join("_") + cacheUniqId;

    const childPropControllers: { [K in keyof S]?: SetPropsRes<S[K]> } = {};
    let showErrors = false;
    // const validationCache: {
    //     controller: ValidationRes<S>,
    //     schema: unknown
    // } | undefined

    let prevSchema: AnySchema | undefined

    const controller: SetPropsRes<S> = {
        value: state,
        setValue: (newValueOrAction) => {
            let newValue = newValueOrAction instanceof Function ? newValueOrAction(controller.value) : newValueOrAction;

            if (newValue instanceof Array) {
                newValue = [...newValue] as S;
            } else if (typeof newValue === "object") {
                newValue = { ...newValue };
            }
            if (controller.value !== newValue) {
                showErrors = true
            }
            controller.value = newValue;
            onChangeState(newValue);
            return newValue;
        },
        setProps(...setPropKeys) {
            return controller.getPropState(...setPropKeys).setValue
        },
        initSetProps(...initialValueKeys) {

            return (...setPropKeys) => {

                return (insiderObj) => {
                    let newValue: any = insiderObj;
                    for (const key of initialValueKeys) {
                        newValue = newValue[key];
                    }


                    controller.setProps(...setPropKeys)(newValue);
                }
            }
        },
        // load
        // state: S,
        // onChangeState: (newSTate: S) => void,
        // pathHierarchy: PropertyKey[] = [],
        // cacheUniqId: string,
        // prevController?: SetPropsRes<S>
        getPropState: (...propertyKeys): SetPropsRes<any> => {
            if (propertyKeys.length === 0) return controller;

            const [propertyKey, ...childProperties] = propertyKeys;
            const propertyController = createSetPropController(controller.value[propertyKey], (newValue) => {
                controller.value[propertyKey] = newValue;

                controller.setValue(controller.value);

                return newValue
            }, childPropControllers[propertyKey]);

            childPropControllers[propertyKey] = propertyController;

            if (childProperties.length) {
                return propertyController.getPropState(...childProperties)

            }
            return propertyController;
        },
        getValidation: (schema) => {
            // prevSchema = schema
            // if (!prevSchema || prevSchema !== schema) {
            //     prevSchema = schema
            // }
            console.log({ schema })
            const validationResult = schema ? validate(schema, {}) : undefined;
            const errors = validationResult?.error ? validateErrorToObject([validationResult.error]) : undefined
            const sss = validateErrorToObject()
            // const validate
            return {
                getError: (...errorPaths) => {
                    // let validationResult = refCache.validateResult;

                    if (showErrors && validationResult?.error) {

                        // const key = errorPaths.join("|");
                        // if (showErrorAfterChange && !isKeyChangeEffect[key]) {
                        //     // if (isEqual(
                        //     //     get(stateValue, errorPaths),
                        //     //     get(stateRefCache.cache?.value, errorPaths)
                        //     // )) {

                        //     return {
                        //         error: false,
                        //         helperText: undefined,
                        //     } as const
                        //     // } else {
                        //     //     isKeyChangeEffect[key] = true;
                        //     // }

                        // }
                        const { error: { details } } = validationResult;

                        detailsLoop: for (const detail of details) {
                            indexingLoop: for (let index = 0; index < errorPaths.length; index++) {
                                const pathName = errorPaths[index];
                                if (pathName != detail.path[index]) {
                                    continue detailsLoop;
                                    break indexingLoop;
                                }
                            }

                            return {
                                error: true,
                                helperText: detail.message,
                            } as const
                        }

                    }

                    return {
                        error: false,
                        helperText: undefined,
                    } as const
                },
                // (path) => {
                //     console.log(pathHierarchy, path)
                // },
                getIfValid: (effectErrorView = false): any => { },
                // getPropValidation: (path: PropertyKey[]) => void
                // getIfValid: () => S
                // getPropValidation: <KEYS extends PropertyKey[]>(...propertyKeys: KEYS) => ValidationRes<GetObjectNestedValue<S, KEYS>>
            }
        }
    }


    return controller;
};
