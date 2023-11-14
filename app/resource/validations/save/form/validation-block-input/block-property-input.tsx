import { useMemoCall, useSetProps } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import AddIcon from '@mui/icons-material/Add';



interface IProps<P = ValidationBlockType[0], S = ValidationBlockType[1], EditCall = (
    ((originalName: P, newPropertyName: P, schema: S) => void) | undefined
)> {
    onEdit: EditCall
    onAdd: EditCall extends undefined ? ((propertyName: P, schema: S) => void) : undefined

    propertyName: EditCall extends undefined ? undefined : P,
    initialSchema: EditCall extends undefined ? undefined : S
    onDestroy?: () => void
}

export const BlockPropertyInput: React.FC<IProps> = React.memo(({ onAdd, onEdit, propertyName, initialSchema, onDestroy }) => {
    const {
        value: {
            name,
            schema,
            isNameEdit

        },
        initSetProps,
        setProps
    } = useSetProps({
        isNameEdit: true,
        name: propertyName || "",
        schema: initialSchema
    })

    console.log({ isNameEdit })
    const onBlurPropertyName = useMemoCall(() => {
        if (name.length === 0) {
            onDestroy?.()
        } else {
            setProps("isNameEdit")(false)
            console.log("{isNameEdit}")
        }
    })
    const onBlurValidation = useMemoCall(() => {
        if (schema == null) {
            return null
        }
        onDestroy?.()
    })
    return <>
        <Stack display={"flex"} flexDirection={"row"} flexWrap={"wrap"} alignItems={"center"} gap={1} justifyContent={"flex-start"}>
            {isNameEdit ? <TextField
                name={name}
                variant="outlined"
                size="small"
                onChange={initSetProps("name")("target", "value")}
                onBlur={onBlurPropertyName}
                autoFocus
                onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                        onBlurPropertyName()
                    }
                }}
                hiddenLabel /> : <Typography>{name}</Typography>}
            <strong>:</strong>
            {!isNameEdit && <IconButton size="small" onClick={() => { }}>
                <AddIcon fontSize="small" />
            </IconButton>}
            {/* {!isNameEdit && <Select
                value={null}
                onBlur={onBlurValidation}
                size="small"
            // onChange={handleChange}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>} */}
        </Stack>
    </>;
});
const getValidationNameToName = (prevName: string) => {

}