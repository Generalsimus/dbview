import React, { useMemo, useState } from "react";
import { ArgPropertiesType, ArgValueType, PropertyNameViews, PropertyNameViewsValue, ValueTypes } from "../types";
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
export const ObjectPropertyValueInput = React.memo(<O extends PropertyNameViews>({ value, onChange, hideNameDot = true, valueOption }: IProps<O>) => {

    const properties: (keyof O)[] = useMemo(() => Object.keys(valueOption), [valueOption])


    const safeArgProperties = useSafeProperties(valueOption, value);
    const { argInputValues, argProperties } = useSafeArgValues(valueOption, value);

    // console.log("argInputValues", argInputValues)
    // 
    const addNewOptionName = useMemoCall((newName: PropertyNameViewsValue<O>["name"]) => {
        const newValue = {
            name: newName,
        }
        onChange(newValue)
    })

    const addAddValueProperty = useMemoCall((propertyValue: PropertyNameViewsValue<PropertyNameViews>) => {
        if (value) {
            // console.log(value)
            const newValue = {
                ...value,
                properties: propertyValue
            }
            onChange(newValue)
        }
    })
    const addAddValueArgs = useMemoCall((argValues: PropertyNameViewsValue<PropertyNameViews>) => {
        if (value) {
            // console.log({ argValues })
            const newValue = {
                ...value,
                argValues: argValues
            }
            onChange(newValue)
        }
    });
    const onChangeArgValue = useMemoArgCall((index: number, newInputValue: ArgValueType) => {
        if (argInputValues && value) {
            const newValue = {
                ...value,
                argValues: argInputValues.map(<El extends ArgValueType>(el: El, currentIndex) => {
                    if (currentIndex === index) {
                        return newInputValue;
                    }
                    return el;
                })
            }
            // console.log("newValue", { newValue })
            onChange(newValue);
        }

    })
    const onChangeArgProperties = useMemoCall((newArgProperties: ArgPropertiesType) => {

        if (value) {
            const newValue = {
                ...value,
                argProperties: newArgProperties
            }
            onChange(newValue);
        }

    })





    if (!value) {
        if (properties.length) {
            return <AddButton options={properties} onAdd={addNewOptionName} />
        }
        return <></>
    }


    const name = hideNameDot ? String(value.name) : `.${String(value.name)}`
    return <>
        <PropertyNameViewContainer name={name}>
            {argInputValues?.map((argValueProp, index) => {
                return <InputsView {...argValueProp} onChange={onChangeArgValue(index)} />
            })}
            {argProperties && <>
                <br />
                <ObjectPropertyValueInput valueOption={argProperties} value={value.argProperties} onChange={onChangeArgProperties} />
                <Stack px={0.5} />
            </>}
        </PropertyNameViewContainer>

        {safeArgProperties && <ObjectPropertyValueInput valueOption={safeArgProperties} value={value.properties} hideNameDot={false} onChange={addAddValueProperty} />}

    </>;
});

