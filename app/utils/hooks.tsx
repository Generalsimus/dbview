import React, { useState, useMemo, useCallback, useRef, SetStateAction, Dispatch, useEffect } from "react";
// import { ValidationError, ValidatorOptions, validateSync } from 'class-validator';
import { ErrorsObject, validate, validateErrorToObject } from "@/utils";
import { ConvertPureType, DeepPartial } from "@/basic/generics";
import { AnySchema, ObjectSchema } from "joi";


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



// const useSetHtmlInput = <Fn extends (() => void)>(callBack: Fn): StandardInputProps['onChange']; => {
//     return useMemoCall((e) => {

//     });
// }



type CreateObjectWithValue<K extends readonly (string | number | symbol)[], V> = K extends readonly [infer First, ...infer Rest] ?
    First extends (string | number | symbol) ?
    Rest extends readonly (string | number | symbol)[] ?
    Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
    : never
    : never
    : never


type GetObjectNestedValue<O, K> = K extends readonly [infer First, ...infer Rest] ?
    First extends (string | number | symbol) ?
    O extends Record<any, any> ? GetObjectNestedValue<O[First], Rest>
    : never
    : never
    : O



// initSetProps: (...initialValueKeys) => {

//     return <KEYS extends string[]>(...valueKeys: KEYS) => {

//         return (insiderObj) => {

interface SetPropsRes<S> {
    value: S
    setValue: Dispatch<SetStateAction<S>>
    setDefault: (defaultValue: SetStateAction<S>) => void
    initSetProps: <SetPropKeys extends string[]>(
        ...setPropKeys: SetPropKeys
    ) => <InitialKeys extends readonly string[]>(
        ...initialValueKeys: InitialKeys
    ) => (insiderObj: CreateObjectWithValue<InitialKeys, SetStateAction<GetObjectNestedValue<S, SetPropKeys>>>) => void
    setProps: <SetPropKeys extends string[]>(...setPropKeys: SetPropKeys) => (newValue: SetStateAction<GetObjectNestedValue<S, SetPropKeys>>) => void
    getNewPropState: <KEY extends keyof S>(property: KEY) => SetPropsRes<S[KEY]>
}
type NewRefCacheType<T extends any> = {
    cache?: SetPropsRes<T>,
    childRefCache: Partial<{
        [K in keyof T]: NewRefCacheType<T[K]>
    }>
}

export const useSetProps = <S extends any>(initialValue: S): SetPropsRes<S> => {
    const refCache = useRef<NewRefCacheType<S>>({
        cache: undefined,
        childRefCache: {}
    }).current
    const [staveValue, setValue] = useState(initialValue)
    const getSetPropFunc = <State extends any>(state: State, setState: Dispatch<SetStateAction<State>>, refCache: NewRefCacheType<State>): SetPropsRes<State> => {
        const { cache, childRefCache } = refCache
        // const cacheValue = cache ?: { ...cache }: { }
        if (cache) {
            return refCache.cache = { ...cache, value: state }
        } else {
            const currentCacheValue: SetPropsRes<State> = {
                value: state,
                setValue: (newValue) => {
                    if (newValue instanceof Function) {
                        setState((old) => {
                            return newValue(old)
                        });
                    } else {
                        setState(newValue);
                    }
                },
                setDefault: (defaultValue) => {
                    return () => {
                        setState(defaultValue);
                    }
                },
                setProps: (...keys) => {
                    return (newValue) => {
                        setState((value) => {
                            let setValue: any = value
                            for (let index = 0; index < keys.length; index++) {
                                const key = keys[index]
                                if (index === (keys.length - 1)) {
                                    setValue[key] = newValue instanceof Function ? newValue(setValue[key]) : newValue
                                } else {
                                    setValue[key] = { ...setValue[key] }
                                }

                            }
                            return { ...setValue } 
                        });

                    }
                },
                initSetProps: (...setPropKeys) => {

                    return (...initialValueKeys) => {

                        return (insiderObj) => {
                            let newValue: any = insiderObj;
                            for (const key of initialValueKeys) {
                                insiderObj[key]
                                newValue = newValue[key];
                            }

                            let currentCacheValueForKeys = currentCacheValue;
                            for (const property of setPropKeys) {
                                currentCacheValueForKeys = currentCacheValueForKeys.getNewPropState(property as any)
                            }
                            currentCacheValueForKeys.setValue(newValue)
                        }
                    }
                },
                getNewPropState: (property) => {
                    return getSetPropFunc(refCache.cache?.value[property]!, (newValue) => {
                        setState((old) => {
                            if (old) {
                                return {
                                    ...old,
                                    [property]: newValue instanceof Function ? newValue(old[property]) : newValue
                                }
                            }
                            return old
                        });

                    }, childRefCache[property] ||= {
                        cache: undefined,
                        childRefCache: {}
                    })
                }
            }
            return refCache.cache = currentCacheValue
        }
    }
    return getSetPropFunc(staveValue, setValue, refCache)
}





// type CreateObjectWithValue<K extends readonly (string | number | symbol)[], V> = K extends readonly [infer First, ...infer Rest] ?
//     First extends (string | number | symbol) ?
//     Rest extends readonly (string | number | symbol)[] ?
//     Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
//     : never
//     : never
//     : never

// type RefValue<S extends any> = [
//     S,
//     Dispatch<SetStateAction<S>>,
//     <P extends readonly string[]>(...args: P) => (insiderObj: CreateObjectWithValue<P, S>) => void,
//     <P extends keyof S>(propertyName: P) => RefValue<S[P]>
// ]

// type RefCacheType<T extends Record<any, any>> = Partial<{
//     [K in keyof T]: [RefCacheType<T[K]>, RefValue<T[K]>]
// }>;

// export const useSetProps = <State extends Record<any, any>>(initialState: State): RefValue<State> => {
//     const [value, setValue] = useState(initialState);

//     const refCaChe = useRef<RefCacheType<State>>({})

//     const getValueFromRefOrCreateNewOne = <V extends Record<any, any>, K extends keyof V>(currentState: V, propertyName: K, setCurrentState: Dispatch<SetStateAction<V>>, ref: RefCacheType<V>): RefValue<V[K]> => {
//         const refVal = ref[propertyName];

//         if (refVal) {
//             refVal[1][0] = currentState[propertyName];
//             return [...refVal[1]]
//         } else {
//             const childRef: RefCacheType<V[K]> = {};
//             const res = CreateChildStateValue(currentState, propertyName, setCurrentState, childRef);
//             ref[propertyName] = [childRef, res];
//             return res;
//         }
//     }

//     const createSetterPropsFn = <V extends any>(setCurrentState: Dispatch<SetStateAction<V>>) => {
//         return <O extends object, S extends readonly string[]>(...args: S) => (insiderObj: CreateObjectWithValue<S, V>) => {
//             let newValue: any = insiderObj;
//             for (const key of args) {
//                 insiderObj[key]
//                 newValue = newValue[key];
//             }

//             setCurrentState(newValue);
//         }

//     }


//     const CreateChildStateValue = <S extends Record<any, any>, K extends keyof S>(currentState: S, propertyName: K, setCurrentState: Dispatch<SetStateAction<S>>, ownPropsRef: RefCacheType<S>): RefValue<S[K]> => {

//         const setPropertyValue: Dispatch<SetStateAction<S[K]>> = (newValue) => {
//             setCurrentState((val) => {
//                 return {
//                     ...val,
//                     [propertyName]: newValue instanceof Function ? newValue(val[propertyName]) : newValue

//                 }
//             });
//         };
//         const result: RefValue<S[K]> = [
//             currentState[propertyName],
//             setPropertyValue,
//             createSetterPropsFn(setPropertyValue),
//             (registerPropertyName: keyof S[K]) => {
//                 return getValueFromRefOrCreateNewOne(result[0], registerPropertyName, setPropertyValue, ownPropsRef);
//             }
//         ];

//         return result;
//     };


//     return [
//         value,
//         setValue,
//         useMemoCall(createSetterPropsFn(setValue)),
//         useMemoCall(<K extends keyof State>(propertyName: K): RefValue<State[K]> => {
//             return getValueFromRefOrCreateNewOne(value, propertyName, setValue, refCaChe.current);
//         })
//     ];
// }


// // <V extends object>(value: DeepPartial<V>, schema: ObjectSchema<V>) => {

export const useValidation = <V extends object>(testValue: DeepPartial<V>, schema: AnySchema<V>) => {
    const validationResult = useMemo(() => {
        // const { value, error, warning } = ;

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