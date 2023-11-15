import { AnySchema, ObjectSchema, extend } from "joi";





export type ConvertPureType<T extends object> = {
    [K in keyof T]:
    T[K] extends object ? ConvertPureType<T[K]> :
    T[K] extends string ? string :
    T[K] extends number ? number :
    T[K]
};


export type ClassToObject<C extends abstract new (...args: any) => any, T = InstanceType<C>> = {
    [K in keyof T]: T[K]
};


// export type ValueOf<O extends object> = {
//     [K in keyof O]: O[K]
// }[keyof O]
export type ValueOf<O extends object> = O[keyof O]


export type OptionalKeys<T extends object, K extends keyof T, V = Omit<T, K>> = V & Partial<Omit<T, keyof V>>
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
// Partial<Pick<T, Extract<keyof T, K>>> & Omit<T, K> extends in</keyof>fer O ?
// { [P in keyof O]: O[P] } : never;


export type DeepPartial<T> = T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;


export type JoiSchemaValue<S extends ObjectSchema> = S extends AnySchema<infer T> ? T : never

