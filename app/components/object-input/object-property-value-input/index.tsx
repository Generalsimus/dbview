import React, { Fragment, useMemo, useState } from "react";
import { ArgPropertiesType, ArgValueType, PropertyNameViews, PropertyNameViewsValue, ValueTypes } from "../types";
import { AddButton } from "./add-button";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Box, Stack } from "@mui/material";
import { PropertyNameViewContainer } from "./property-name-container";
import { ValueOf } from "@/basic/generics";
import e from "express";
import { useSafeArgValues, useSafeProperties } from "./hooks";
import { InputsView } from "./input-view";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";


interface IProps<O extends PropertyNameViews> {
    value?: PropertyNameViewsValue<O>,
    onChange: (newValue: PropertyNameViewsValue<O>) => void,
    onRemove?: () => void,
    valueOption: O,
    hideNameDot?: boolean,
    indexHierarchy?: number
}
export const ObjectPropertyValueInput = React.memo(<O extends PropertyNameViews>({ value, onChange, onRemove, hideNameDot = true, valueOption, indexHierarchy = 0 }: IProps<O>) => {

    const properties: (keyof O)[] = useMemo(() => Object.keys(valueOption), [valueOption])


    const safeProperties = useSafeProperties(valueOption, value);
    const { argInputValues, argProperties } = useSafeArgValues(valueOption, value);
  
    const addNewOptionName = useMemoCall((newName: PropertyNameViewsValue<O>["name"]) => {
        const newValue = {
            name: newName,
        }
        onChange(newValue)
    })

    const addAddValueProperty = useMemoCall((propertyValue?: PropertyNameViewsValue<PropertyNameViews>) => {
        if (value) { 
            const newValue = {
                ...value,
                properties: propertyValue
            }
            onChange(newValue)
        }
    })
    const onRemoveProperties = useMemoCall(() => { 
        addAddValueProperty(value?.properties?.properties)
    })

 
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
            onChange(newValue);
        }

    })
    const onChangeArgProperties = useMemoCall((newArgProperties?: ArgPropertiesType) => {

        if (value) {
            const newValue = {
                ...value,
                argProperties: newArgProperties
            }
            onChange(newValue);
        }

    })


    const onRemoveArgProperties = useMemoCall(() => { 
        onChangeArgProperties(undefined)
    })



    if (!value) {
        if (properties.length) {
            return <AddButton options={properties} onAdd={addNewOptionName} />
        }
        return <></>
    }
    

    const name = hideNameDot ? String(value.name) : `.${String(value.name)}`
    
    
    return <>
        <PropertyNameViewContainer name={name} onRemove={onRemove}>
            {argInputValues?.map((argValueProp, index) => {
                return <InputsView key={index} {...argValueProp} onChange={onChangeArgValue(index)} />
            })}
            {argProperties && <>
                {value.argProperties && <Stack flexBasis={"100%;"} />}
                {value.argProperties && <Stack flexBasis={`${indexHierarchy + 1}%;`} />}

                <ObjectPropertyValueInput valueOption={argProperties} value={value.argProperties} onRemove={onRemoveArgProperties} onChange={onChangeArgProperties} indexHierarchy={indexHierarchy + 1} />

                {value.argProperties && <Stack flexBasis={"100%;"} />}
                {value.argProperties && <Stack flexBasis={`${indexHierarchy}%;`} />}
            </>}
        </PropertyNameViewContainer>

        {safeProperties && <ObjectPropertyValueInput valueOption={safeProperties} value={value.properties} onRemove={onRemoveProperties} hideNameDot={false} indexHierarchy={indexHierarchy} onChange={addAddValueProperty} />}

    </>;
});

