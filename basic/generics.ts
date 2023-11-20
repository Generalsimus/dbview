import { AnySchema, ObjectSchema, ValidationResult, extend } from "joi";





export type ConvertPureType<T> = T extends object ? {
    [K in keyof T]: ConvertPureType<T[K]>
} : T extends string ? T | string :
    T extends number ? T | number :
    T;


export type ClassToObject<C extends abstract new (...args: any) => any, T = InstanceType<C>> = {
    [K in keyof T]: T[K]
};


export type ValueOf<O extends any> = O extends object ? O[keyof O] : never


export type OptionalKeys<T extends object, K extends keyof T, V = Omit<T, K>> = V & Partial<Omit<T, keyof V>>



export type MakeStateValue<T, O = ConvertPureType<T>> = O extends any[] ? MakeStateValue<O[number]>[] : O extends object ? {
    [K in keyof O]?: MakeStateValue<O[K]> | undefined
} : O


export interface InputChange<T, V = MakeStateValue<T>> {
    value?: V
    onChange: (newValue: V) => void
    getError?: (...errorPaths: PropertyKey[]) => {
        error: boolean;
        helperText: string;
    } | {
        error: boolean;
        helperText: undefined;
    }
}



export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


export type JoiSchemaValue<S extends AnySchema> = S extends AnySchema<infer T> ? T : never
export type JoiSchemaResultValue<S extends ValidationResult> = S extends ValidationResult<infer T> ? T : never


export type CreateObjectWithValue<K extends readonly PropertyKey[], V> = K extends readonly [infer First, ...infer Rest] ?
    First extends PropertyKey ?
    Rest extends readonly PropertyKey[] ?
    Rest extends readonly [infer First2, ...infer Rest2] ? Record<First, CreateObjectWithValue<Rest, V>> : Record<First, V>
    : never
    : never
    : V



export type GetObjectNestedValue<O, K> = K extends readonly [infer First, ...infer Rest] ?
    First extends PropertyKey ?
    O extends Record<any, any> ? GetObjectNestedValue<O[First], Rest>
    : never
    : never
    : O