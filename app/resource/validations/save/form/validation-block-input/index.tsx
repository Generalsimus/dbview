import { useMemoCall, useSetProps, useToggleBool } from "@/app/utils/hooks";
import { ValidateValueType, ValidationBlockType } from "@/basic/models/validation/validation";
import { OutlinedFlag } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, IconButton, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { ValueOf } from "@/basic/generics";
import { BlockPropertyInput } from "./block-property-input";
import { ViewBlockProperty } from "./view-block-property";

interface IProps<V = ValidationBlockType[]> {
    value?: V,
    onChange: (newValue: V) => void
}
export const ValidationBlockInput: React.FC<IProps> = React.memo(({ value: propertyAndSchema = [], onChange }) => {
    const theme = useTheme()

    const [isAddingProcess, initDefaultValue] = useToggleBool(false)
    const onShowAddInput = initDefaultValue(true);
    const onHideAddInput = initDefaultValue(false);

    const addPoperyNameAndValidate = useMemoCall((name: string, validate: ValidateValueType) => {
        onChange([
            ...propertyAndSchema,
            [name, validate]
        ])
        onHideAddInput()
    })
    const editPoperyNameAndValidate = useMemoCall((oldName: string, value: ValidationBlockType) => {
        onChange(propertyAndSchema.map(e => {
            if (e[0] == oldName) {
                return value
            }
            return e;
        }))
        onHideAddInput()
    })


    
    return <Stack display={"flex"} flexDirection={"column"} gap={2} justifyContent={"flex-start"} border={`1px solid ${theme.palette.action.active}}`} borderRadius={4} padding={"5px"}>
        <Stack display={"flex"} justifyContent={"flex-start"}>
            <Stack display={"flex"} justifyContent={"flex-start"}>
                {propertyAndSchema.map(value => {
                    return <ViewBlockProperty value={value} onChange={editPoperyNameAndValidate} />

                })}
                {isAddingProcess && <BlockPropertyInput
                    onAdd={addPoperyNameAndValidate}
                    onEdit={undefined}
                    propertyName={undefined}
                    initialSchema={undefined}
                    onDestroy={onHideAddInput}
                />}
            </Stack>

            <IconButton onClick={onShowAddInput}>
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});
