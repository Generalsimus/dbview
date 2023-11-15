import { useMemoCall, useSetProps } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { OptionalKeys } from "@/basic/generics";
import { NameInput } from "./name=input";
import { AddValidationButton } from "./add-validation-button";


type initialValueType = OptionalKeys<ValidationBlockType, "schema">
interface IProps {
    onChange: (newValue: initialValueType, prevName: initialValueType["name"]) => void,
    onRemove: (name: initialValueType["name"]) => void,
    startNameEdit: boolean
    propertyName: initialValueType["name"],
    initialSchema?: initialValueType["schema"]
}

export const BlockPropertyInput: React.FC<IProps> = React.memo(({ onChange, onRemove, startNameEdit, propertyName, initialSchema }) => {
    const {
        value: {
            name,
            schema,
        },
        initSetProps,
        setProps
    } = useSetProps({
        name: propertyName || "",
        schema: initialSchema
    });

    const onBlur = useMemoCall(() => {
        onChange({
            name: name,
            schema: schema,
        }, propertyName.trim());
    });
    const onRemoveHandler = useMemoCall(() => {
        onRemove(propertyName)
    });
    // const onStartEdit = useMemoCall(() => {
    //     setProps("isNameEdit")(true);
    // });
    // console.log({ propertyName, name, isNameEdit })
    // name: ValidationBlockType["name"],
    // onChange: (newName: ValidationBlockType["name"]) => void
    // onBlur: () => void
    // startEditing: boolean
    const isNewProperty = propertyName.length === 0
    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
            <IconButton size="small" color="error" onClick={onRemoveHandler}>
                <DeleteIcon fontSize="small" />
            </IconButton>
            {<NameInput
                name={name}
                onBlur={onBlur}
                onChange={initSetProps("name")("target", "value")}
                startEditing={isNewProperty}
            />}
            {/* {isNameEdit ? <TextField
                value={name}
                variant="outlined"
                size="small"
                onChange={initSetProps("name")("target", "value")}
                onBlur={onBlur}
                autoFocus
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        onBlur()
                    }
                }}
                hiddenLabel /> : <Typography onClick={onStartEdit}>{name}</Typography>} */}
            <strong>:</strong>
            {/* {!isNameEdit && <IconButton size="small" onClick={() => { }}>
                <AddIcon fontSize="small" />
            </IconButton>}  */}
            <AddValidationButton
                schema={schema}
                onChange={setProps("schema")}
            // schema?: ValidationBlockType["name"]
            // onChange: (newValue: ValidationBlockType["name"]) => void
            />
            {/* <IconButton size="small" onClick={() => { }}>
                <AddIcon fontSize="small" />
            </IconButton> */}
        </Stack>
    </>;
}); 