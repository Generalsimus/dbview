import React, { useState, useMemo, useCallback, useRef, SetStateAction, Dispatch, useEffect } from "react";
import { ValidationError, ValidatorOptions, validate, validateSync } from 'class-validator';
import { getValidationErrorToString } from "@/utils";
import { ConvertPureType } from "@/types/generics";


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




type NestedKeyOf<ObjectType extends object> = { [Key in keyof ObjectType]: (ObjectType[Key] extends object ? [Key, ...NestedKeyOf<ObjectType[Key]>] : [Key]) | [Key] }[keyof ObjectType];









type CreateObjectWithValue<K extends readonly (string | number | symbol)[], V> = K extends readonly [infer First, ...infer Rest] ?
    First extends (string | number | symbol) ?
    Rest extends readonly (string | number | symbol)[] ?
    Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
    : never
    : never
    : never

type RefValue<S extends any> = [
    S,
    Dispatch<SetStateAction<S>>,
    <P extends readonly string[]>(...args: P) => (insiderObj: CreateObjectWithValue<P, S>) => void,
    <P extends keyof S>(propertyName: P) => RefValue<S[P]>
]

type RefCacheType<T extends Record<any, any>> = Partial<{
    [K in keyof T]: [RefCacheType<T[K]>, RefValue<T[K]>]
}>;

export const useSetProps = <State extends Record<any, any>>(initialState: State): RefValue<State> => {
    const [value, setValue] = useState(initialState);

    const refCaChe = useRef<RefCacheType<State>>({})

    const getValueFromRefOrCreateNewOne = <V extends Record<any, any>, K extends keyof V>(currentState: V, propertyName: K, setCurrentState: Dispatch<SetStateAction<V>>, ref: RefCacheType<V>): RefValue<V[K]> => {
        const refVal = ref[propertyName];

        if (refVal) {
            refVal[1][0] = currentState[propertyName];
            return [...refVal[1]]
        } else {
            const childRef: RefCacheType<V[K]> = {};
            const res = CreateChildStateValue(currentState, propertyName, setCurrentState, childRef);
            ref[propertyName] = [childRef, res];
            return res;
        }
    }

    const createSetterPropsFn = <V extends any>(setCurrentState: Dispatch<SetStateAction<V>>) => {
        return <O extends object, S extends readonly string[]>(...args: S) => (insiderObj: CreateObjectWithValue<S, V>) => {
            let newValue: any = insiderObj;
            for (const key of args) {
                insiderObj[key]
                newValue = newValue[key];
            }

            setCurrentState(newValue);
        }

    }


    const CreateChildStateValue = <S extends Record<any, any>, K extends keyof S>(currentState: S, propertyName: K, setCurrentState: Dispatch<SetStateAction<S>>, ownPropsRef: RefCacheType<S>): RefValue<S[K]> => {

        const setPropertyValue: Dispatch<SetStateAction<S[K]>> = (newValue) => {
            setCurrentState((val) => {
                return {
                    ...val,
                    [propertyName]: newValue instanceof Function ? newValue(val[propertyName]) : newValue

                }
            });
        };
        const result: RefValue<S[K]> = [
            currentState[propertyName],
            setPropertyValue,
            createSetterPropsFn(setPropertyValue),
            (registerPropertyName: keyof S[K]) => {
                return getValueFromRefOrCreateNewOne(result[0], registerPropertyName, setPropertyValue, ownPropsRef);
            }
        ];

        return result;
    };


    return [
        value,
        setValue,
        useMemoCall(createSetterPropsFn(setValue)),
        useMemoCall(<K extends keyof State>(propertyName: K): RefValue<State[K]> => {
            return getValueFromRefOrCreateNewOne(value, propertyName, setValue, refCaChe.current);
        })
    ];
}




export const useValidation = <V extends object>(value: Partial<ConvertPureType<V>>, schema: new (...args: any[]) => V, options?: ValidatorOptions) => {
    const schemaValue = useMemo(() => {
        return new schema();
    }, []);
    const refCaChe = useRef(value)
    const errors = useMemo(() => {
        Object.assign(schemaValue, value);
        return validateSync(schemaValue, options);
    }, [value, schemaValue])

    return {
        getIfValid: useMemoCall(() => {
            if (errors.length == 0) {
                return schemaValue
            }
        }),
        getError: useMemoCall((name: keyof typeof value) => {
            if (refCaChe.current[name] != value[name]) {
                for (const error of errors) {
                    if (error.property == name) {
                        return {
                            error: true,
                            helperText: getValidationErrorToString([error])
                        }
                    }
                }
            }
            return {
                error: false,
                helperText: "",
            }

        })
    }
}