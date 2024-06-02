import { CreateObjectWithValue, GetObjectNestedValue, JoiSchemaValue } from "@/utils/generics"
import { validate } from "@/utils"
import Joi, { AnySchema } from "joi"
import { SetStateAction } from "react"

type Error = {
    error: true,
    helperText: string | undefined,
} | {
    error: false,
    helperText: undefined,
}
export interface ValidationRes<S> {
    getError: (...path: PropertyKey[]) => Error,
    toggleShowError: (showErrors?: boolean) => boolean
    hasError: () => boolean
    getIfValid: (showErrors?: boolean) => S | undefined
    // getPropValidation: <KEYS extends PropertyKey[]>(...propertyKeys: KEYS) => ValidationRes<GetObjectNestedValue<S, KEYS>> 
}
export interface SetPropsRes<S> {
    value: S
    setValue: (newValueOrAction: SetStateAction<S>) => S,
    // saveIndexedDB: (id: string) => void
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
    parentController?: SetPropsRes<S>,
    pathHierarchy: PropertyKey[] = [],
) => {
    // console.log("CREATEEEEEEEE", prevController)
    if (prevController) {
        prevController.value = state;
        return prevController;
    }
    // const controllerId = pathHierarchy.join("_") + cacheUniqId;

    const childPropControllers: { [K in keyof S]?: SetPropsRes<S[K]> } = {};
    let showErrors = false;
    let needValidate = true;

    let validationResult: Joi.ValidationResult<any> | undefined
    let validatorCache: ValidationRes<any> | undefined

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
                needValidate = true;
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


        // state: S,
        // onChangeState: (newSTate: S) => void,
        // cacheUniqId: string,
        // prevController?: SetPropsRes<S>,
        // pathHierarchy: PropertyKey[] = [],
        getPropState: (...propertyKeys): SetPropsRes<any> => {
            if (propertyKeys.length === 0) return controller;

            const [propertyKey, ...childProperties] = propertyKeys;
            const propertyController = createSetPropController(controller.value[propertyKey], (newValue) => {
                controller.value[propertyKey] = newValue;

                controller.setValue(controller.value);

                return newValue
            }, cacheUniqId, childPropControllers[propertyKey], controller, [...pathHierarchy, propertyKey]);

            childPropControllers[propertyKey] = propertyController;

            if (childProperties.length) {
                return propertyController.getPropState(...childProperties)

            }
            return propertyController;
        },
        getValidation: (schema) => {
            // cons</any>ole.log(!!needValidate, !!schema, { value: controller.value, schema })
            if (needValidate && schema) {
                validationResult = validate(controller.value, schema)
                needValidate = false;
            }
            if (validatorCache) {
                return validatorCache
            }

            const validator: ValidationRes<JoiSchemaValue<typeof schema>> = validatorCache = {
                getError: (...errorPaths) => {
                    if (validator.hasError()) {
                        if (showErrors && validationResult?.error) {
                            const { error: { details } } = validationResult;
                            // console.log(showErrors && validationResult?.error, details, errorPaths, "SSS")
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

                        } else if (!validationResult && parentController) {
                            return parentController.getValidation().getError(...pathHierarchy)
                        }

                    }
                    return {
                        error: false,
                        helperText: undefined,
                    } as const
                },
                hasError: () => {
                    return !!(validationResult ? validationResult?.error : parentController?.getValidation().hasError())
                },
                toggleShowError: (show) => {
                    const newShowErrors = show == undefined ? !showErrors : show;
                    if (showErrors !== newShowErrors) {
                        showErrors = newShowErrors;
                        controller.setValue(controller.value)
                    }
                    return newShowErrors;
                },
                getIfValid: (showErrors): any => {
                    if (showErrors !== undefined) {
                        validator.toggleShowError(showErrors)
                    }
                    // console.log({ validationResult, eee: validator.hasError() })
                    if (!validator.hasError()) {
                        return controller.value
                    }
                },
            };

            return validator;
        }
    }


    return controller;
};
