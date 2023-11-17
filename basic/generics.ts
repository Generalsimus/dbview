import { AnySchema, ObjectSchema, extend } from "joi";





export type ConvertPureType<T> = T extends object ? {
    [K in keyof T]: ConvertPureType<T[K]>
} : T extends string ? T | string :
    T extends number ? T | number :
    T;


export type ClassToObject<C extends abstract new (...args: any) => any, T = InstanceType<C>> = {
    [K in keyof T]: T[K]
};


export type ValueOf<O extends object> = O[keyof O]


export type OptionalKeys<T extends object, K extends keyof T, V = Omit<T, K>> = V & Partial<Omit<T, keyof V>>



export type MakeStateValue<T, O = ConvertPureType<T>> = O extends any[] ? MakeStateValue<O[number]>[] : O extends object ? {
    [K in keyof O]?: MakeStateValue<O[K]> | undefined
} : O


export interface InputChange<T, V = MakeStateValue<T>> {
    value?: V
    onChange: (newValue: V) => void
}



export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


export type JoiSchemaValue<S extends ObjectSchema> = S extends AnySchema<infer T> ? T : never

