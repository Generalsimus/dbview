import { SetPropsRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { AnySchema, ObjectSchema, ValidationResult, extend } from "joi";
import { merge } from "lodash";
import { UnionToIntersection, Unionize } from "utility-types";
// import { NumberDataTypeValidationType, StringDataTypeValidationType, ValidateDataTypesEnums, ValidateValueType } from "./models/validation/data-types";




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
  ? DeepPartial<InferredArrayMember>[]
  : Thing extends object
  ? DeepPartialObject<Thing>
  : Thing

type DeepPartialObject<Thing> = {
  [Key in keyof Thing]?: DeepPartial<Thing[Key]>
}

/////////////////////////////////////////////

export type ValueOf<O extends any> = O extends object ? O[keyof O] : never


export type JoiSchemaValue<S extends any> = S extends AnySchema<infer T> ? T : never
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


export type ExtractTypeWithProps<O, Props extends PropertyKey[], Value> = Props extends readonly [...infer Rest, infer Last] ? Last extends PropertyKey ? Extract<GetObjectNestedValue<O, Rest>, { [K in Last]: Value }> : never : never
export type ExtractTypeWithProp<O, Prop extends PropertyKey, Value> = ExtractTypeWithProps<O, [Prop], Value>
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type PartialKeys<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>> extends infer O ? { [P in keyof O]: O[P] } : never;


type OptionalKeys<T> = T extends any ?
  { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T] : never;

type Idx<T, K extends PropertyKey, D = never> =
  T extends any ? K extends keyof T ? T[K] : D : never;

type AllKeys<T> = T extends any ? keyof T : never;


export type DeepUnion<T> =
  [T] extends [Array<infer E>] ? DeepUnion<E>[] :
  [T] extends [object] ? PartialKeys<
    { [K in AllKeys<T>]: DeepUnion<Idx<T, K>> },
    Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>
  > :
  T;


////////////////////////////////////////////



// type A = { key1: string, key2: string, k4: string }
// type B = { key1: string, key3: string, k4: number }

// type Nn = Unionize<A & B>
// type MergedAA = DeepUnion<A | B>
// type MergedAW = DeepUnion<Nn>
// type MergedAC = DeepUnion<ValidateValueType>
// type MergedAD = DeepUnion<string[] | number[]>
// type MergedAB = (A & B)['key1']

////////////////////////////


export type MakeStateValue<O extends any> = DeepPartial<DeepUnion<O>> | undefined
export type MakeStateRequiredValue<O extends any> = DeepPartial<DeepUnion<O>>


export interface InputProps<T> extends SetPropsRes<MakeStateValue<T>> {

}

export interface InputPropsRequiredValue<T> extends SetPropsRes<MakeStateRequiredValue<T>> {

}
///////////////////////////////////////////////////////

export type ValueOrFunc<V> = V | (() => V)

// export type FunctionOrAsValue<V> = V extends (...args: any[]) => infer R ? R : V
//////////////////////////////////////////////////////