import { ValidationPropertySchema, ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { InputPropsRequiredValue } from "@/basic/generics";
import { AddValidationButton } from "./add-validation-button";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { EditPropertyNameInput } from "./property-name-input";
import { ErrorText } from "@/app/components/error-text";
import { PropertyNameViews, PropertyNameViewsValue } from "@/app/components/object-properties-input/types";
import { ObjectPropertiesInput } from "@/app/components/object-properties-input";


interface IProps extends InputPropsRequiredValue<ValidationPropertyType> {
    onRemove: () => void
}
export const PropertyInput: React.FC<IProps> = React.memo(({ onRemove, getPropState, setProps, getValidation, value = {} }) => {
    const val = value;

    const onRemoveSafeHandler = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            for (const _ in (value.value || {})) {
                return;
            }
            onRemove()
        }
    });
    const onRemoveValueValidation = useMemoCall(() => {
        const propertyName = (value.property + "").trim();
        if (propertyName.length === 0) {
            onRemove()
        } else {
            setProps("value")({});
        }
    })
    const { getError } = getValidation(ValidationPropertySchema, false)

    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemove}>
                <DeleteIcon fontSize="small" />
            </IconButton>

            <EditPropertyNameInput {...getPropState("property")} onBlur={onRemoveSafeHandler} />

            <Typography variant="h5" sx={{ padding: "0 0.3em" }}>:</Typography>

            {/* <AddValidationButton {...getPropState("value")} onRemove={onRemoveValueValidation} /> */}
            <Test />
            <ErrorText error={getError("value").helperText} />
        </Stack>
    </>;
});
// autoCreateProperty?: boolean,
// argValues?: ValueOrFunc<PropertyNameViews | ValueTypes[]>
// properties?: ValueOrFunc<PropertyNameViews>;

const dataTypes: PropertyNameViews = {
    Number: {
        // argValues: () => StringOptions,
        dentFilterProperties: true,
        properties: () => StringOptions,
    },
    String: {
        // argValues: () => StringOptions,
        dentFilterProperties: true,
        properties: () => StringOptions,
    },
}
const StringOptions: PropertyNameViews = {
    MinLength: {
        // argValues: () => StringOptions,
        properties: () => StringOptions,
    },
    MaxLength: {
        // argValues: () => StringOptions,
        properties: () => StringOptions,
    },
    Or: {
        argValues: () => dataTypes,
        properties: () => StringOptions,
    },
    Optional: {
        // argValues: () => StringOptions,
        properties: () => StringOptions,
    }
}
const options: PropertyNameViews = {
    Min: {
        argValues: () => options,
        properties: () => options,
    }
}

const Test = () => {
    const [value, onChange] = useState<PropertyNameViewsValue<typeof dataTypes>>()

    return <>
        {/* 1 */}
        <ObjectPropertiesInput value={value} valueOption={dataTypes} onChange={onChange} />
        {/* 2 */}
    </>
}