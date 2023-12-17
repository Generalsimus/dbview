import { JoiSchemaValue, ValueOf } from "@/basic/generics"
import Joi, { AnySchema } from "joi"
import { ReactNode } from "react"

export const enum InputTypes {
    None,
    Number,
    String,
    Select
}
interface ValueGeneric<T extends any, V extends any> {
    type: T,
    value?: V,
    validate: AnySchema<V>,

}
interface ValueOptionsGeneric<T extends any, V extends any> extends ValueGeneric<T, V> {
    // options: Record<string, V>
    // options: Map<any, V>
    options: { label: string, value: V }[]
}


export type ValueTypes = ValueGeneric<InputTypes.Number, number> | ValueGeneric<InputTypes.String, string> | ValueOptionsGeneric<InputTypes.Select, number | string>



export type ValueOrFunc<V> = V | (() => V)


export interface PropertyNameValueViews {
    autoCreateProperty?: boolean,

    dentFilterProperties?: boolean,
    dentFilterAfterChoose?: boolean,
    filterArgProperties?: boolean,

    argValues?: ValueOrFunc<ValueTypes[]>
    argProperties?: ValueOrFunc<PropertyNameViews>
    properties?: ValueOrFunc<PropertyNameViews>;
}
export type PropertyNameViews = Record<string, PropertyNameValueViews>
// export interface PropertyNameViews {
//     [k: string]: PropertyNameValueViews
// }

// type GetArgValueV<V extends any> = V extends PropertyNameViews ? PropertyNameViewsValue<V> : V
// type GetPropertiesValueV<V extends any> = V extends PropertyNameViews ? PropertyNameViewsValue<V> : V


// type GetArgValue<V extends PropertyNameViewsValue<any>["argValues"]> = GetArgValueV<Exclude<V, undefined | Function>>
// export type GetPropertiesValue<V extends PropertyNameViewsValue<any>["properties"]> = GetPropertiesValueV<Exclude<V, undefined | Function>>
export type ArgValueTypeGen<T extends Exclude<PropertyNameValueViews["argValues"], undefined | Function>[number]> = {
    type: T["type"]
    value?: JoiSchemaValue<T["validate"]>
};
export type ArgValueType<V extends PropertyNameValueViews = PropertyNameValueViews> = ArgValueTypeGen<Exclude<V["argValues"], undefined | Function>[number]>




export type ArgPropertiesType<V extends PropertyNameValueViews = PropertyNameValueViews> = PropertyNameViewsValue<Exclude<V["argProperties"], undefined | Function>>

export type PropertiesType<V extends PropertyNameValueViews = PropertyNameValueViews> = PropertyNameViewsValue<Exclude<V["properties"], undefined | Function>>


// export interface PropertyNameViewsValue<T extends PropertyNameViews, V extends PropertyNameValueViews = ValueOf<T>>   {
//     name: string,
//     argValues?: ArgValueType<V>[]
//     argProperties?: ArgPropertiesType<V>
//     properties?: PropertiesType<V>
// };

export type PropertyNameViewsValue<V extends PropertyNameViews> = ({
    [K in keyof V]: {
        name: string,
        argValues?: ArgValueType<V[K]>[]
        argProperties?: ArgPropertiesType<V[K]>
        properties?: PropertiesType<V[K]>
    }
}[keyof V]);



// export interface PropertyNameViewsValue<V extends PropertyNameViews = PropertyNameViews, KEY extends string = (keyof V)> =

// ({
//     [K in keyof V]: {
//         name: string,
//         argValues?: ArgValueType<V[K]>[]
//         argProperties?: ArgPropertiesType<V[K]>
//         properties?: PropertiesType<V[K]>
//     }
// }[keyof V]);




export type PropertyType<O extends PropertyNameViews = PropertyNameViews> = { propertyName: string, value: PropertyNameViewsValue<PropertyNameViews> }

////////////////////////////////////////////////
// const enum MainDataTypes {
//     String = "String",
//     Number = "Number",
// }
// const ssss: PropertyNameViews = {
//     [MainDataTypes.String]: {
//         properties: {
//             MinLength: {
//                 autoCreateProperty: true,
//                 argValues: [
//                     {
//                         type: InputTypes.Number,
//                         value: 0,
//                         validate: Joi.number().required()
//                     }
//                 ]
//             },
//             MaxLength: {
//                 autoCreateProperty: true,
//                 argValues: [
//                     {
//                         type: InputTypes.Number,
//                         value: 0,
//                         validate: Joi.number().required()
//                     }
//                 ]
//             },
//             Or: {
//                 properties: () => ssss
//             }
//         }
//     }
// }
// type EE = PropertyNameViewsValue<typeof ssss>