import React, { useState, useMemo, useCallback, useRef, SetStateAction, Dispatch, useEffect } from "react";
// import { ValidationError, ValidatorOptions, validateSync } from 'class-validator';
import { ErrorsObject, validate, validateErrorToObject } from "@/utils";
import { ConvertPureType, DeepPartial } from "@/basic/generics";
import { AnySchema, ObjectSchema, State } from "joi";


export const useMemoCall = <FN extends ((...args: any[]) => any)>(value: FN): FN => {
    const callSaveRef = useRef<FN>(value);
    callSaveRef.current = value;
    return useRef((...args: Parameters<FN>): ReturnType<FN> => {
        return callSaveRef.current(...args);
    }).current as FN
}

export const useToggleBool = (initialValue: boolean) => {
    const [value, setValue] = useState(initialValue);
    const callSaveRef = useRef<Record<string, () => void>>({});


    return [value, useCallback((neValue?: SetStateAction<boolean>) => {
        return (callSaveRef.current[neValue + ""] ||= () => {
            if (neValue == undefined) {
                setValue(e => !e);
            } else {
                setValue(neValue);
            }
        });
    }, []), setValue] as const;
}


type CreateObjectWithValue<K extends readonly PropertyKey[], V> = K extends readonly [infer First, ...infer Rest] ?
    First extends PropertyKey ?
    Rest extends readonly PropertyKey[] ?
    Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
    : never
    : never
    : V


type GetObjectNestedValue<O, K> = K extends readonly [infer First, ...infer Rest] ?
    First extends PropertyKey ?
    O extends Record<any, any> ? GetObjectNestedValue<O[First], Rest>
    : never
    : never
    : O

interface SetPropsRes<S> {
    state: S
    setState: Dispatch<SetStateAction<S>>
    setDefault: (defaultValue: SetStateAction<S>) => void
    // setProps: <InitialKeys extends PropertyKey[]>(
    //     ...initialValueKeys: InitialKeys
    // ) => <SetPropKeys extends readonly PropertyKey[]>(
    //     ...setPropKeys: SetPropKeys
    // ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void

    setProps: <SetPropKeys extends PropertyKey[]>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void


    initSetProps: <InitialKeys extends PropertyKey[]>(
        ...initialValueKeys: InitialKeys
    ) => <SetPropKeys extends readonly PropertyKey[]>(
        ...setPropKeys: SetPropKeys
    ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void
    // setPropsValue: <InitialKeys extends readonly PropertyKey[]>(
    //     ...initialValueKeys: InitialKeys
    // ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<S>>) => void
    // setProps: <SetPropKeys extends PropertyKey[]>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void
    getPropState: <KEY extends keyof S>(property: KEY) => SetPropsRes<S[KEY]>
}

type NewRefCacheType<T extends any> = {
    cache?: SetPropsRes<T>,
    childRefCache: Partial<{
        [K in keyof T]: NewRefCacheType<T[K]>
    }>
}


const getSetPropController = <State extends unknown>(
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
            let currentCacheValueForKeys: SetPropsRes<any> = currentSetPropController;
            for (const property of setPropKeys) {
                currentCacheValueForKeys = currentCacheValueForKeys.getPropState(property)
            }
            return currentCacheValueForKeys.setState
        },
        getPropState(property) {
            const { childRefCache } = refCache;
            const propertyRefCache = childRefCache[property] ||= {
                cache: undefined,
                childRefCache: {}
            }

            return propertyRefCache.cache ||= getSetPropController(refCache.cache?.state[property]!, (newValue) => {
                currentSetPropController.setState((old): any => {
                    old[property] = newValue instanceof Function ? newValue(old[property]) : newValue;

                    if (old instanceof Array) {
                        return [...old];
                    } else if (old) {
                        return { ...old };
                    }
                    return old
                });

            }, propertyRefCache)
        }
    }
    return currentSetPropController
}

export const useInitialSetProps = <S extends any>(
    staveValue: S,
    setValue: Dispatch<SetStateAction<S>>,
) => {
    const refCache = useRef<NewRefCacheType<S>>({
        cache: undefined,
        childRefCache: {}
    }).current;
    // refCache[]
    return refCache.cache ||= getSetPropController(staveValue, setValue, refCache)
}




export const useChangeSetProps = <S extends any>(
    staveValue: S,
    onChange: (newValue: S) => void,
) => {
    const setValue: Dispatch<SetStateAction<S>> = useMemoCall((newValue) => {
        onChange(newValue instanceof Function ? newValue(staveValue) : newValue)
    })

    return useInitialSetProps(staveValue, setValue)
}




export const useSetProps = <S extends any>(initialValue: S) => {
    return useInitialSetProps(...useState(initialValue))
}


export const useValidation = <V extends object>(testValue: DeepPartial<V>, schema: AnySchema<V>) => {
    const validationResult = useMemo(() => {
        // const {value, error, warning} = ;

        return validate(testValue, schema)
    }, [testValue, schema])
    console.log(validationResult)
    return {
        getIfValid: useMemoCall((): V | undefined => {
            if (!validationResult.error) {
                return validationResult.value
            }
        }),
        getError: useMemoCall((name: keyof V) => {
            // const error = errors[String(name)]
            // if (error) {
            //     return {
            //         error: true,
            //         helperText: error.error,
            //     }
            // }
            return {
                error: false,
                helperText: "",
            }

        })
    }
}