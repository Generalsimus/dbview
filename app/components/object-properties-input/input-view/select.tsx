import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent, useMemo, useState } from "react";
import { InputTypes, ValueTypes } from "../types";
import { AutoResizeField } from "../../auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Autocomplete } from "@mui/material";

interface IProps<V = ExtractTypeWithProp<ValueTypes, "type", InputTypes.Select>> {
    value: V
    onChange: (newValue: V) => void
}
export const Select: React.FC<IProps> = React.memo(({ value, onChange }) => {
    const omChangeValue = useMemoCall((e: React.SyntheticEvent<Element, Event>, newValue: (keyof IProps["value"]["options"])) => {
        onChange({
            ...value,
            value: newValue
        })
    })
    const optionsValues: (keyof IProps["value"]["options"])[] = useMemo(() => Object.keys(value.options), [])
    return <>
        <Autocomplete
            disablePortal
            freeSolo
            value={value.value}
            options={optionsValues}
            disableClearable
            disableListWrap
            onChange={(e, v) => {

            }}
            autoFocus
            // Adore
            getOptionLabel={(option) => value.options[option]}
            sx={{ minWidth: "2em" }}
            componentsProps={{ popper: { style: { width: 'fit-content' } } }}
            renderInput={(params) => {
                console.log(params)
                return <AutoResizeField
                    {...params}
                    type="text"
                    variant="outlined"
                    size="small"

                    sx={{ minHeight: "1.5em", minWidth: "1em" }}
                    hiddenLabel
                // {...getError()}

                />
            }}
        />
    </>;
});
