import { Dispatch, SetStateAction } from "react"
import { ValidateRefCacheType, createValidationController } from "./create=validation-controller"
import { AnySchema } from "joi"
import { CreateObjectWithValue, GetObjectNestedValue, JoiSchemaValue } from "@/basic/generics"
import { Validator } from "./create=validation-controller"
// import { Validator } from "sequelize"

export interface SetPropsRes<S> {
    state: S
    setState: Dispatch<SetStateAction<S>>
    setDefault: (defaultValue: SetStateAction<S>) => void


    setProps: <SetPropKeys extends PropertyKey[]>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void
    initSetProps: <InitialKeys extends PropertyKey[]>(
        ...initialValueKeys: InitialKeys
    ) => <SetPropKeys extends readonly PropertyKey[]>(
        ...setPropKeys: SetPropKeys
    ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void
    getValidation: <schemaType extends AnySchema>(schema: schemaType, showErrorAfterChange?: boolean) => Validator<JoiSchemaValue<schemaType>>
    getPropState: <KEYS extends PropertyKey[]>(...propertyKeys: KEYS) => SetPropsRes<GetObjectNestedValue<S, KEYS>>
}

export type NewRefCacheType<T extends any> = {
    cache?: SetPropsRes<T>,
    validationCache?: ValidateRefCacheType<any>,
    childRefCache: Partial<{
        [K in keyof T]: NewRefCacheType<T[K]>
    }>
}


export const createSetPropController = <State extends unknown>(
    state: State,
    originalSetState: Dispatch<SetStateAction<State>>,
    refCache: NewRefCacheType<State>
): SetPropsRes<State> => {

    let currentSetPropController: SetPropsRes<State> = refCache.cache ||= {
        state: state,
        setState: (newValue) => {

            return originalSetState((oldValue) => {
                const newValueRes = newValue instanceof Function ? newValue(oldValue) : newValue;
                refCache.cache = currentSetPropController = {
                    ...currentSetPropController,
                    state: newValueRes
                };

                return newValueRes;
            });
        },
        setDefault(defaultValue: SetStateAction<State>) {
            return () => {
                currentSetPropController.setState(defaultValue);
            }
        },
        initSetProps(...initialValueKeys) {

            return (...setPropKeys) => {

                return (insiderObj) => {
                    let newValue: any = insiderObj;
                    for (const key of initialValueKeys) {
                        newValue = newValue[key];
                    }


                    currentSetPropController.setProps(...setPropKeys)(newValue);
                }
            }
        },
        setProps(...setPropKeys) {
            return currentSetPropController.getPropState(...setPropKeys).setState
        },
        getPropState(...propertyKeys) {

            let propertyRefCache: NewRefCacheType<any> = refCache
            let propertySetPropController: SetPropsRes<any> = currentSetPropController
            for (const property of propertyKeys) {
                const propertyLocalRefCache: NewRefCacheType<any> = propertyRefCache.childRefCache[property as any] ||= {
                    cache: undefined,
                    childRefCache: {}
                };
                const propertyLocalSetPropController: SetPropsRes<any> = propertySetPropController;

                propertyRefCache = propertyLocalRefCache;

                propertySetPropController = propertyLocalRefCache.cache ||= createSetPropController(propertyLocalSetPropController.state[property], (newValue) => {

                    propertyLocalSetPropController.setState((old: any): any => {
                        old[property] = newValue instanceof Function ? newValue(old[property]) : newValue;

                        if (old instanceof Array) {
                            return [...old];
                        } else if (old) {
                            return { ...old };
                        }
                        return old
                    });

                }, propertyLocalRefCache);
                propertySetPropController.state = propertyLocalSetPropController.state[property]
            }

            return propertySetPropController;
        },
        getValidation(schema, showErrorAfterChange = true) {
            return createValidationController(refCache, schema, showErrorAfterChange);
        }
    }
    return currentSetPropController
}


