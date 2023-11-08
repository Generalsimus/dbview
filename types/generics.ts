




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


export type ValueOf<O extends object> = {
    [K in keyof O]: O[K]
}[keyof O]

