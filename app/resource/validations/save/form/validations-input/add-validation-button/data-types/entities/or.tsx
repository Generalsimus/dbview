import React, { ChangeEvent, ReactNode, useState } from "react";
import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi, { AnySchema } from "joi";
import { TypeNameViewContainer } from "../type-name-container";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import { StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { DataTypeView } from "..";
import { AddValidationButton } from "../..";
import { useChangeSetProps } from "@/app/utils/hooks/useSetProps";

type El = ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.Or>;

interface IProps extends InputProps<El> {
    onRemove: () => void
}
export const Or: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, getPropState, onRemove }) => {
    const { entityValue = {} } = value

    const setSelfValue = useMemoCall((el: (typeof entityValue)) => {

        setValue({
            type: EntityValidateEnums.Or,
            entityValue: el
        });
        console.log({ el })
    })
    const state = useChangeSetProps(entityValue, setSelfValue).getPropState("value")

    return <>

        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
            <br />
            <AddValidationButton {...state} onRemove={onRemove} />
            <br />
        </TypeNameViewContainer>
    </>;
});

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
interface ValueOptionsGeneric<T extends any, V extends any> extends ValueGeneric<T, V> {
    options: { label: ReactNode, value: V }[]
}
type ValueOrFunc<V> = V | (() => V)
type ValueTypes = ValueGeneric<InputTypes.Number, number> | ValueGeneric<InputTypes.String, string> | ValueOptionsGeneric<InputTypes.Select, number | string>
interface PropertyNameViews {
    [K: string]: {
        autoCreateProperty?: boolean,
        argsView?: ValueOrFunc<PropertyNameViews | ValueTypes[]>
        properties?: ValueOrFunc<PropertyNameViews>;
    }
}

// interface ValidateDataTypes<T extends any = any, V extends any = any> {
//     // name: T
//     // optionChildren: ValidateDataTypes[]
//     // isMain?: boolean
//     // value: V,

//     // validateValue: AnySchema<V>
// }
const enum MainDataTypes {
    String = "String",
    Number = "Number",
}
const ssss: PropertyNameViews = {
    [MainDataTypes.String]: {
        properties: {
            MinLength: {
                autoCreateProperty: true,
                argsView: [
                    {
                        type: InputTypes.Number,
                        value: 0,
                        validate: Joi.number().required()
                    }
                ]
            },
            MaxLength: {
                autoCreateProperty: true,
                argsView: [
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