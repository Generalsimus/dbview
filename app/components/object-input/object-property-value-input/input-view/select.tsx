import { ExtractTypeWithProp } from "@/basic/generics";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { ArgValueType, InputTypes, ValueTypes } from "../../types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Autocomplete, Box, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { entries, keyBy, map, find } from "lodash";
import { useMemoArgCall } from "@/app/utils/hooks/useMemoArgCall";



interface IProps extends ExtractTypeWithProp<ValueTypes, "type", InputTypes.Select> {
    onChange: (newValue: ArgValueType) => void
}
export const Select: React.FC<IProps> = React.memo(({ type, value, validate, options, onChange }) => {
    // const [localValue, setLocalValue] = useState<(typeof options)[number] | typeof value>(value)
    const omChangeValue = useMemoCall((newValue: typeof value) => {
        onChange({
            type: type,
            value: newValue
        })
    });
    const onChangeValue = useMemoArgCall((newValue: IProps["value"]) => {

        omChangeValue(newValue);
    });
    const onChangeInput = useMemoCall((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        omChangeValue(e.target.value);
    })
    // const { valueOptions } = useMemo(() => {
    //     // const optionsByLabel

    //     // return options.reduce < Record<string, string>((curr, option) => {
    //     //     return curr
    //     // }, {})
    //     return {
    //         valueOptions: map(options, "value")
    //     }
    // }, [])
    // console.log({ value })
    return <>
        <Autocomplete
            disablePortal
            freeSolo
            value={value + ""}
            options={options}
            disableClearable
            disableListWrap
            // noOptionsText
            disableCloseOnSelect
            // disabledItemsFocusable

            renderOption={(props, o) => {
                return <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} onClick={onChangeValue(o.value)} >{o.label}</Box>
            }}

            autoFocus
            sx={{ minWidth: "2em" }}
            componentsProps={{ popper: { style: { width: 'fit-content' } } }}
            renderInput={(params) => {
                // console.log(params)
                // params.InputProps.value = value
                return <AutoResizeField
                    onChange={onChangeInput}
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
