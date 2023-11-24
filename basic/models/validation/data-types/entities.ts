import Joi from "joi"


export const enum EntityValidationEnums {
    Min = "Min",
    Max = "Max",
    MinLength = "MinLength",
    MaxLength = "MaxLength",
    Optional = "Optional",
    Regex = "Regex",
    // Rwwegex = "Regesx"
}

export interface EntityValidationGeneric<T extends EntityValidationEnums, V> {
    type: T,
    entity: V
}

export interface MinType {
    value: number
}
export const MinSchema = Joi.object<MinType>({
    value: Joi.number().required()
})

export interface MaxType {
    value: number
}
export const MaxSchema = Joi.object<MaxType>({
    value: Joi.number().required()
})


export interface MinLengthType {
    value: number
}
export const MinLengthSchema = Joi.object<MinLengthType>({
    value: Joi.number().required()
})

export interface MaxLengthType {
    value: number
}
export const MaxLengthSchema = Joi.object<MaxLengthType>({
    value: Joi.number().required()
})


export interface OptionalValueType {
    // value: number
}
export const OptionalValueSchema = Joi.object<OptionalValueType>({
    // value: Joi.number().positive().required()/
})


export interface RegexType {
    value: string
}
export const RegexSchema = Joi.object<RegexType>({
    value: Joi.string().required()
})


// export interface DateType {

// }
// export const DateSchema = {
// }


// export interface LowerCaseType {

// }
// export const LowerCaseSchema = {
// }


// export interface UpperCaseType {

// }
// export const UpperCaseSchema = {
// }


// export interface DefaultType {

// }
// export const DefaultSchema = {
// }


// export interface RegExpType {
//     value: string
// }
// export const RegExpSchema = {
//     value: Joi.string().required()
// }

// export interface ReplaceType {
//     from: string
//     to: string
// }
// export const ReplaceSchema = {
//     from: Joi.string().required(),
//     to: Joi.string().required()
// }


// const trimSides = ["BothSide", "Left", "Right", "Full"]
// export interface TrimType {
//     type: (typeof trimSides)[number]

// }
// export const TrimSchema = {
//     type: Joi.string().allow(...trimSides).required()
// }



// export interface IntegerType {

// }
// export const IntegerSchema = {
// }


// export interface FloatType {
//     precision?: number
// }
// export const FloatSchema = {
//     precision: Joi.number().positive().optional()
// }



// export interface PositiveType {

// }
// export const PositiveSchema = {
// }


// export interface NegativeType {

// }
// export const NegativeSchema = {
// }


