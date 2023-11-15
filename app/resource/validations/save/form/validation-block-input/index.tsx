import { useMemoCall, useSetProps, useToggleBool } from "@/app/utils/hooks";
import { ValidateValueType, ValidationBlockType } from "@/basic/models/validation/validation";
import { OutlinedFlag } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, IconButton, MenuItem, OutlinedInput, Select, Stack, TextField, Typography, useTheme } from "@mui/material";
import React, { ReactNode, useMemo, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { OptionalKeys, ValueOf } from "@/basic/generics";
import { BlockPropertyInput } from "./block-property-input";
import { ViewBlockProperty } from "./view-block-property";

interface IProps<V = (OptionalKeys<ValidationBlockType, "schema">[])> {
    value?: V,
    onChange: (newValue: V) => void
}
export const ValidationBlockInput: React.FC<IProps> = React.memo(({ value: propertyAndSchema = [], onChange }) => {
    const theme = useTheme()

    const [isAddingProcess, initDefaultValue] = useToggleBool(false)
    const onShowAddInput = initDefaultValue(true);
    const onHideAddInput = initDefaultValue(false);


    const onRemoveItem = useMemoCall((name: ValidationBlockType["name"]) => {
        onChange(propertyAndSchema.filter(e => (e.name !== name)));
    });
    const onChangeValidation = useMemoCall((newValue: OptionalKeys<ValidationBlockType, "schema">, prevPropertyName: string) => {
        if (newValue.name.length !== 0) {
            if (prevPropertyName.length == 0) {
                onChange([
                    ...propertyAndSchema.filter(e => (e.name !== newValue.name)),
                    newValue
                ])
            } else {
                onChange(propertyAndSchema.map(el => {
                    if (el.name == prevPropertyName) {
                        return newValue
                    }
                    return el;
                }))
            }
        }
        onHideAddInput()
    })
    console.log({ theme })



    return <Stack
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        justifyContent={"flex-start"}
        alignItems={"flex- start"}
        border={`1px solid ${theme.palette.action.active}}`}
        borderRadius={theme.shape.borderRadius}
        padding={"5px"}
    >
        {propertyAndSchema.length ? <Stack display={"flex"} justifyContent={"flex-start"}>
            {propertyAndSchema.map(item => {
                return <BlockPropertyInput
                    key={item.name}
                    onChange={onChangeValidation}
                    onRemove={onRemoveItem}
                    propertyName={item.name}
                    initialSchema={item.schema}
                    startNameEdit={false}
                />
            })}
        </Stack> : null}
        {isAddingProcess && <BlockPropertyInput
            onChange={onChangeValidation}
            onRemove={onHideAddInput}
            propertyName={""}
            startNameEdit={true}
        // initialSchema={item.schema}
        />}
        <Stack display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <IconButton onClick={onShowAddInput}>
                <AddIcon />
            </IconButton>
        </Stack>
    </Stack>;
});
