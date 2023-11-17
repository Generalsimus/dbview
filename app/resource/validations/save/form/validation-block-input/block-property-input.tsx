import { useChangeSetProps, useMemoCall, useSetProps } from "@/app/utils/hooks";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputChange, MakeStateValue, OptionalKeys } from "@/basic/generics";
import { PropertyNameInput } from "./name=input";
import { AddValidationButton } from "./add-validation-button";
import { ValidateValueType } from "@/basic/models/validation/data-types";

//   InputChange<ValidateValueType> 
// type initialValueType = MakeStateValue<ValidationPropertyType>
interface IProps extends InputChange<ValidationPropertyType> {
    // onChange: (newValue: initialValueType, prevName: initialValueType["property"]) => void,
    onRemove: (name: ValidationPropertyType["property"]) => void,
    // startNameEdit: boolean
    // initialProperty: initialValueType["property"],
    // initialValue?: MakeStateValue<ValidationPropertyType["value"]>
    //  initialValueType["value"]
}

export const BlockPropertyInput: React.FC<IProps> = React.memo(({ onChange, onRemove, value = {} }) => {
    const onChangeMiddleware = useMemoCall((newValue: IProps["value"] = {}) => {
        const { property = "", value: propertyValue = {} } = newValue || {};

        if (property.length !== 0) {
            onChange(newValue)
            return
        }
        for (const key in propertyValue) {
            onChange(newValue)
            return
        }

        onRemove(value.property || "");
    })

    const {
        state: {
            property = "",
            value: propertyValue
        },
        setProps
    } = useChangeSetProps(value, onChangeMiddleware)

    const onRemoveHandler = useMemoCall(() => {
        onRemove(property)
    });

    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            <PropertyNameInput
                value={property}
                onChange={setProps("property")}
            // startEditing={!property}
            />
            <strong>:</strong>
            <AddValidationButton
                value={propertyValue}
                onChange={setProps("value")}

            />
            {/* <AddValidationButton
                schema={schema}
                onChange={setProps("schema")}

            /> */}

        </Stack>
    </>;
}); 