import React, { useMemo, useState } from "react";
import { GetPropertiesValue, PropertyNameViews, PropertyNameViewsValue, ValueTypes } from "./types";
import { AddButton } from "./add-button";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Stack } from "@mui/material";
import { PropertyNameViewContainer } from "./property-name-container";
import { ValueOf } from "@/basic/generics";
import e from "express";
import { useSafeArgValues, useSafeProperties } from "./hooks";
import { InputsView } from "./input-view";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";


interface IProps<O extends PropertyNameViews> {
    value?: PropertyNameViewsValue<O>,
    onChange: (newValue: PropertyNameViewsValue<O>) => void,
    valueOption: O,
    hideNameDot?: boolean
}
export const ObjectPropertiesInput = React.memo(<O extends PropertyNameViews>({ value, onChange, hideNameDot = true, valueOption }: IProps<O>) => {

    const addNewOptionName = useMemoCall((newName: keyof O) => {
        const newValue = {
            name: newName,
        }
        onChange(newValue)
    })

    const addAddValueProperty = useMemoCall((propertyValue: PropertyNameViewsValue<PropertyNameViews>) => {
        if (value) {
            console.log(value)
            const newValue = {
                ...value,
                properties: propertyValue
            }
            onChange(newValue)
        }
    })
    const addAddValueArgs = useMemoCall((argValues: PropertyNameViewsValue<PropertyNameViews>) => {
        if (value) {
            console.log({ argValues })
            const newValue = {
                ...value,
                argValues: argValues
            }
            onChange(newValue)
        }
    });
    const onChangeArgValue = useMemoArgCall((index: number, newValue: ValueTypes) => {

    })


    const properties: (keyof O)[] = useMemo(() => Object.keys(valueOption), [valueOption])


    const safeProperties = useSafeProperties(valueOption, value);
    const safeArgValues = useSafeArgValues(valueOption, value);



    if (!value) {
        if (properties.length) {
            return <AddButton options={properties} onAdd={addNewOptionName} />
        }
        return <></>
    }


    const name = hideNameDot ? String(value.name) : `.${String(value.name)}`


    return <>
        <PropertyNameViewContainer name={name}>
            {(() => {
                if (safeArgValues instanceof Array) {
                    const ee = safeArgValues
                    safeArgValues.map((input, index) => {
                        return <InputsView value={input} onChange={onChangeArgValue(index)} />
                    })
                } else if (safeArgValues) {
                    const { argValues } = value
                    let argValue: PropertyNameViewsValue<PropertyNameViews> | undefined = argValues instanceof Array ? undefined : argValues;
                    return <>
                        <Stack px={0.5} />
                        <ObjectPropertiesInput valueOption={safeArgValues} value={argValue} onChange={addAddValueArgs} />
                        <Stack px={0.5} />
                    </>
                }
                return <></>
            })()}
        </PropertyNameViewContainer>

        {safeProperties && <ObjectPropertiesInput valueOption={safeProperties} hideNameDot={false} value={value.properties} onChange={addAddValueProperty} />}

    </>;
});

