import { ValueOf, ValueOrFunc } from "@/basic/generics"
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
    value: V,
    validate: AnySchema<V>,

}
interface ValueOptionsGeneric<T extends any, Value extends PropertyKey> extends ValueGeneric<T, Value> {
    options: Record<Value, string>
    // { label: ReactNode, value: V }[]
}


export type ValueTypes = ValueGeneric<InputTypes.Number, number> | ValueGeneric<InputTypes.String, string> | ValueOptionsGeneric<InputTypes.Select, number | string>




type PropertyNameValueViews = {
    autoCreateProperty?: boolean,

    dentFilterProperties?: boolean,
    filterArgProperties?: boolean,

    argValues?: ValueOrFunc<PropertyNameViews | ValueTypes[]>
    properties?: ValueOrFunc<PropertyNameViews>;
}
export type PropertyNameViews = Record<string, PropertyNameValueViews>

type GetArgValueV<V extends any> = V extends PropertyNameViews ? PropertyNameViewsValue<V> : V
type GetPropertiesValueV<V extends any> = V extends PropertyNameViews ? PropertyNameViewsValue<V> : V


type GetArgValue<V extends PropertyNameViewsValue<any>["argValues"]> = GetArgValueV<Exclude<V, undefined | Function>>
export type GetPropertiesValue<V extends PropertyNameViewsValue<any>["properties"]> = GetPropertiesValueV<Exclude<V, undefined | Function>>


export type PropertyNameViewsValue<V extends PropertyNameViews> = ({
    [K in keyof V]: {
        name: K,
        argValues?: GetArgValue<V[K]["argValues"]>
        properties?: GetPropertiesValue<V[K]["properties"]>
    }
}[keyof V]);


const enum MainDataTypes {
    String = "String",
    Number = "Number",
}
const ssss: PropertyNameViews = {
    [MainDataTypes.String]: {
        properties: {
            MinLength: {
                autoCreateProperty: true,
                argValues: [
                    {
                        type: InputTypes.Number,
                        value: 0,
                        validate: Joi.number().required()
                    }
                ]
            },
            MaxLength: {
                autoCreateProperty: true,
                argValues: [
                    {
                        type: InputTypes.Number,
                        value: 0,
                        validate: Joi.number().required()
                    }
                ]
            },
            Or: {
                properties: () => ssss
            }
        }
    }
}
type EE = PropertyNameViewsValue<typeof ssss>