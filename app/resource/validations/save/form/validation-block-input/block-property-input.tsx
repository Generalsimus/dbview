import { useMemoCall, useSetProps } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { OptionalKeys } from "@/basic/generics";
import { PropertyNameInput } from "./name=input";
import { AddValidationButton } from "./add-validation-button";


type initialValueType = OptionalKeys<ValidationBlockType, "schemas">
interface IProps {
    onChange: (newValue: initialValueType, prevName: initialValueType["property"]) => void,
    onRemove: (name: initialValueType["property"]) => void,
    // startNameEdit: boolean
    initialProperty: initialValueType["property"],
    initialSchemas?: initialValueType["schemas"]
}

export const BlockPropertyInput: React.FC<IProps> = React.memo(({ onChange, onRemove, initialProperty, initialSchemas }) => {
    const {
        value: {
            property,
            schemas,
        },
        initSetProps,
        setProps
    } = useSetProps({
        property: initialProperty || "",
        schemas: initialSchemas
    });

    const onBlur = useMemoCall(() => {
        onChange({
            property: property,
            schemas: schemas,
        }, initialProperty.trim());
    });
    const onRemoveHandler = useMemoCall(() => {
        onRemove(initialProperty)
    });
    // const onStartEdit = useMemoCall(() => {
    //     setProps("isNameEdit")(true);
    // });
    console.log({ property })
    // name: ValidationBlockType["name"],
    // onChange: (newName: ValidationBlockType["name"]) => void
    // onBlur: () => void
    // startEditing: boolean
    const isNewProperty = initialProperty.length === 0
    // const sss = initSetProps("name")("target", "value")
    // property
    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            {<PropertyNameInput
                property={property}
                onBlur={onBlur}
                onChange={initSetProps("property")("target", "value")}
                startEditing={isNewProperty}
            />}
            <strong>:</strong>
            <AddValidationButton
                schemas={schemas}
                onChange={setProps("schemas")}

            />

        </Stack>
    </>;
}); 