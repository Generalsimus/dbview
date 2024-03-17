import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { PartialKeys } from "@/basic/generics"; 
// import { useMemoCall } from "@/app/resources/utils/hooks/useSignalRefresh"; 
import Joi from "joi";
import { InputTypes, PropertyNameViews, PropertyNameViewsValue, PropertyType } from "./types";
import { ObjectPropertyValueInput } from "./object-property-value-input";
import { PropertyNameInput } from "./property-name-input";
import { useMemoCall } from "@/app/resources/utils/hooks/useMemoCall";



interface IProps<V = PartialKeys<PropertyType, "value">> {
    value: V,
    onChange: (newValue: V) => void,
    onRemove: () => void,
    optionalValues: PropertyNameViews
}
export const PropertyInput: React.FC<IProps> = React.memo(({ value, onChange, onRemove, optionalValues }) => {
    const val = value;

    const onRemoveSafeHandler = useMemoCall(() => {
        const propertyName = String(value.propertyName).trim();
        if (propertyName.length === 0) {
            for (const _ in (value.value || {})) {
                return;
            }
            onRemove()
        }
    });
    const onRemoveValueValidation = useMemoCall(() => {
        const propertyName = String(value.propertyName).trim();
        if (propertyName.length === 0) {
            onRemove()
        } else {
            onChange({
                ...value,
                propertyName: propertyName,
            })
        }
    })
    const onChangeInputValue = useMemoCall((newValue: PropertyNameViewsValue<PropertyNameViews>) => {
        onChange({
            ...value,
            value: newValue,
        })
    })
    // const { getError } = getValidation(ValidationPropertySchema, false)
    const onChangeName = useMemoCall((newName: PropertyType["propertyName"]) => {
        onChange({
            ...value,
            propertyName: newName,
        })
    })

    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemove}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            <PropertyNameInput value={value.propertyName} onChange={onChangeName} />

            <Typography variant="h5" sx={{ padding: "0 0.3em" }}>:</Typography>

            {/* <AddValidationButton {...getPropState("value")} onRemove={onRemoveValueValidation} /> */}

            <ObjectPropertyValueInput value={value.value} valueOption={optionalValues} onChange={onChangeInputValue} />
        </Stack>
    </>;
});




// // autoCreateProperty?: boolean,
// // argValues?: ValueOrFunc<PropertyNameViews | ValueTypes[]>
// // properties?: ValueOrFunc<PropertyNameViews>;

// const dataTypes: PropertyNameViews = {
//     Number: {
//         // argValues: () => StringOptions,
//         dentFilterProperties: true,
//         properties: () => StringOptions,
//     },
//     String: {
//         // argValues: () => StringOptions,
//         dentFilterProperties: true,
//         properties: () => StringOptions,
//     },
// }
// const StringOptions: PropertyNameViews = {
//     MinLength: {
//         argValues: [
//             {
//                 type: InputTypes.Number,
//                 value: 0,
//                 validate: Joi.number().required()
//             }
//         ],
//         properties: () => StringOptions,
//     },
//     MaxLength: {
//         // argValues: () => StringOptions,
//         properties: () => StringOptions,
//     },
//     Or: {
//         argValues: () => dataTypes,
//         properties: () => StringOptions,
//     },
//     Optional: {
//         // argValues: () => StringOptions,
//         properties: () => StringOptions,
//     }
// }
// const options: PropertyNameViews = {
//     Min: {
//         argValues: () => options,
//         properties: () => options,
//     }
// }

