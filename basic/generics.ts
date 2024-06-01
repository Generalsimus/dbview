import { SetPropsRes } from "@/app/utils/hooks/useSetProps/create-set-prop-controller";
import { AnySchema, ValidationResult } from "joi";
import { ColumnType } from "kysely";

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
    ? DeepPartial<InferredArrayMember>[]
    : Thing extends object
      ? DeepPartialObject<Thing>
      : Thing;

type DeepPartialObject<Thing> = {
  [Key in keyof Thing]?: DeepPartial<Thing[Key]>;
};

/////////////////////////////////////////////

export type ValueOf<O extends any> = O extends object ? O[keyof O] : never;

export type JoiSchemaValue<S extends any> =
  S extends AnySchema<infer T> ? T : never;
export type JoiSchemaResultValue<S extends ValidationResult> =
  S extends ValidationResult<infer T> ? T : never;

export type CreateObjectWithValue<
  K extends readonly PropertyKey[],
  V,
> = K extends readonly [infer First, ...infer Rest]
  ? First extends PropertyKey
    ? Rest extends readonly PropertyKey[]
      ? Rest extends readonly [infer First2, ...infer Rest2]
        ? Record<First, CreateObjectWithValue<Rest, V>>
        : Record<First, V>
      : never
    : never
  : V;

export type GetObjectNestedValue<O, K> = K extends readonly [
  infer First,
  ...infer Rest,
]
  ? First extends PropertyKey
    ? O extends Record<any, any>
      ? GetObjectNestedValue<O[First], Rest>
      : never
    : never
  : O;

export type ExtractTypeWithProps<
  O,
  Props extends PropertyKey[],
  Value,
> = Props extends readonly [...infer Rest, infer Last]
  ? Last extends PropertyKey
    ? Extract<GetObjectNestedValue<O, Rest>, { [K in Last]: Value }>
    : never
  : never;
export type ExtractTypeWithProp<
  O,
  Prop extends PropertyKey,
  Value,
> = ExtractTypeWithProps<O, [Prop], Value>;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export type PartialKeys<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

type OptionalKeys<T> = T extends any
  ? { [K in keyof T]-?: {} extends Pick<T, K> ? K : never }[keyof T]
  : never;

type Idxx<T, K extends PropertyKey, D = never> = T extends any
  ? K extends keyof T
    ? T[K]
    : D
  : never;

type AllKeys<T> = T extends any ? keyof T : never;

export type DeepUnion<T> = [T] extends [Array<infer E>]
  ? DeepUnion<E>[]
  : [T] extends [object]
    ? PartialKeys<
        { [K in AllKeys<T>]: DeepUnion<Idxx<T, K>> },
        Exclude<AllKeys<T>, keyof T> | OptionalKeys<T>
      >
    : T;

////////////////////////////////////////////
// export type OmitBy<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// type A = { key1: string, key2: string, k4: string }
// type B = { key1: string, key3: string, k4: number }

// type Nn = Unionize<A & B>
// type MergedAA = DeepUnion<A | B>
// type MergedAW = DeepUnion<Nn>
// type MergedAC = DeepUnion<ValidateValueType>
// type MergedAD = DeepUnion<string[] | number[]>
// type MergedAB = (A & B)['key1']

////////////////////////////

// export type MakeStateValue<O extends any> = DeepPartial<DeepUnion<O>> | undefined
// export type MakeStateRequiredValue<O extends any> = DeepPartial<DeepUnion<O>>

export interface InputProps<T> extends SetPropsRes<T> {}

// export interface InputPropsRequiredValue<T> extends SetPropsRes<MakeStateRequiredValue<T>> {

// }
///////////////////////////////////////////////////////

// export type ValueOrFunc<V> = V | (() => V)

// export type FunctionOrAsValue<V> = V extends (...args: any[]) => infer R ? R : V
//////////////////////////////////////////////////////
//-------------- -----------------------------------------------------------------------
export type UnionProperties<
  T extends Record<any, any>,
  U extends Record<any, any>,
  RequiredKeys extends PropertyKey = Extract<keyof T, keyof U>,
  OptionalKeys extends PropertyKey =
    | Exclude<keyof T, keyof U>
    | Exclude<keyof U, keyof T>,
> = {
  [K in RequiredKeys]: U[K] | T[K];
} & {
  [K in OptionalKeys]?:
    | (K extends keyof U ? U[K] : undefined)
    | (K extends keyof T ? T[K] : undefined);
};
// T extends object ? U extends object ? {
//   // [K in keyof (T & U)]: K extends keyof U
//   // ? U[K]
//   // : K extends keyof T
//   // ? T[K]
//   // : never
// } : (T | U) : (T | U);
// const ss = (a: UnionProperties<{ id: number }, { ifd: "number" }>) => {
//   return a.id
// }

export type SetValue<
  T,
  P extends string,
  V,
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? {
        [Key in keyof T]: Key extends K ? SetValue<T[Key], Rest, V> : T[Key];
      }
    : T & {
        [Key in K]: SetValue<{}, Rest, V>;
      }
  : {
      [Key in keyof T]: Key extends P ? V : T[Key];
    } & {
      [Key in P]: V;
    };

export type GetKyselyModel<O extends Record<any, any>> = {
  [K in keyof O]: O[K] extends ColumnType<infer T, any, any> ? T : O[K];
};
