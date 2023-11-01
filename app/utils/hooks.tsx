
import React, { useState, useMemo, useCallback, useRef, SetStateAction, Dispatch } from "react";


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






type GetObjectNestedValueType<O, K extends readonly string[]> = K extends readonly [infer First, ...infer Rest] ?
    Rest extends readonly string[] ? First extends keyof O ?
    Rest extends readonly [infer First2, ...infer Rest2] ? GetObjectNestedValueType<O[First], Rest> : O[First]
    : never : never
    : never;



type CreateObjectWithValue<K extends readonly (string | number | symbol)[], V> = K extends readonly [infer First, ...infer Rest] ?
    First extends (string | number | symbol) ?
    Rest extends readonly (string | number | symbol)[] ?
    Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
    : never
    : never
    : never



// K extends readonly [infer First, ...infer Rest] ?
//     Rest extends readonly string[] ? First extends keyof O ?
//     Rest extends readonly [infer First2, ...infer Rest2] ? GetObjectNestedValueType<O[First], Rest> : O[First]
//     : never : never
//     : never;

const keys = ["b", "d", "e"] as const

const nestedObject = {
    b: {
        c: "s",
        d: {
            e: "t",
        },
    },
} as const;
// type Val = string[]
type NewObj = CreateObjectWithValue<typeof keys, "es">;
type ValueType = GetObjectNestedValueType<typeof nestedObject, typeof keys>;
// ValueType will be "t"

// ValueType will be "t"

// const eeeხხხხხ = <O extends Record<any, any>>(obj: O, ...args: NestedKeyOf<O>) => {

// }
// const vvv = {
//     ss: { a: { ssa: { qq: { b: { c: "s" } } } } }
// }
// eeeხხხხხ(vvv, "ss", "a")



// const typableFn = <O extends Record<any, any>>(obj: O, ...keys: NestedKeyOf<O>) => {

// };

// // Example usage:
// const arg = { a: { b: { c: "s" } } };
// const value = typableFn(arg, "a", "b");
// console.log(value); // "s"




type RefValue<S extends Record<any, any>> = [
    S,
    Dispatch<SetStateAction<S>>,
    <O extends object>(...args: NestedKeyOf<O>) => (insiderObj: O) => void,
    <P extends keyof S>(propertyName: P) => RefValue<S[P]>
]

export type RefCacheType<T extends Record<any, any>> = Partial<{
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
    const createSetterPropsFn = <O extends object>(setCurrentState: Dispatch<SetStateAction<O>>) => {
        return <O extends object, S extends readonly string[]>(...args: S) => (insiderObj: O) => {
            let newValue: GetObjectNestedValueType<O, S> = 0 as any;
            // for (const key of args) {
            //     newValue = newValue[key];
            // }

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
            createSetterPropsFn(setPropertyValue) as any,
            (registerPropertyName: keyof S[K]) => {
                return getValueFromRefOrCreateNewOne(result[0], registerPropertyName, setPropertyValue, ownPropsRef);
            }
        ];

        return result;
    };


    return [
        value,
        setValue,
        useMemoCall(createSetterPropsFn(setValue)) as any,
        useMemoCall(<K extends keyof State>(propertyName: K): RefValue<State[K]> => {
            return getValueFromRefOrCreateNewOne(value, propertyName, setValue, refCaChe.current) as any;
        })
    ];
}


// type DeepKeyOf<T extends any> = T extends Record<any, any> ? keyof:""


// [D] extends [never] ? never : T extends object ?
//     { [K in keyof T]-?: K extends string | number ?
//         `${K}` | Join<K, Paths<T[K], Prev[D]>>
//         : never
//     }[keyof T] : ""

// type DeepKeyOf<T> = T extends object
//   ? {
//       [K in keyof T]-?: K | `${K & string}.${DeepKeyOf<T[K]>}`;
//     }[keyof T]
//   : '';


// type NestedKeyOf<ObjectType extends object> =
//     keyof ObjectType extends never ? [] :
//     { [Key in keyof ObjectType]:
//         ObjectType[Key] extends object
//         ? [Key, ...NestedKeyOf<ObjectType[Key]>]
//         : [Key]
//     }[keyof ObjectType];

