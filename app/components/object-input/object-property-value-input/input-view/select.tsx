import { ExtractTypeWithProp } from "@/basic/generics";
import React, { useMemo } from "react";
import { ArgValueType, InputTypes, ValueTypes } from "../../types";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { Autocomplete, Box, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { entries, keyBy } from "lodash";



interface IProps extends ExtractTypeWithProp<ValueTypes, "type", InputTypes.Select> {
    onChange: (newValue: ArgValueType) => void
}
export const Select: React.FC<IProps> = React.memo(({ type, value, validate, options, onChange }) => {
    // const omChangeValue = useMemoCall((e: React.SyntheticEvent<Element, Event>, newValue: (keyof IProps["options"])) => {
    //     onChange({
    //         type: type,
    //         value: newValue
    //     })
    // })
    // const optionsValues: (keyof IProps["options"])[] = useMemo(() => Object.keys(options), [])
    const onChangeValue = useMemoCall((newValue: IProps["value"]) => {
        onChange({
            type: type,
            value: newValue
        })
    })
    const { } = useMemo(() => {
        // const optionsByLabel

        // return options.reduce < Record<string, string>((curr, option) => {
        //     return curr
        // }, {})
        return keyBy(options, "label")
    }, [])
    console.log({ value })
    return <>
        <Autocomplete
            disablePortal
            freeSolo
            value={value + ""}
            options={options}
            disableClearable
            disableListWrap
            onChange={(e, v) => {
                console.log({ vvv: v, updated: typeof v === "string" ? v : v.value })
                onChangeValue(typeof v === "string" ? v : v.value)
            }}
            autoFocus
            // Adore

            // getOptionLabel={(option) => typeof option === "string" ? option : option.label}
            // renderOption={(pros, option) => option.label}
            sx={{ minWidth: "2em" }}
            componentsProps={{ popper: { style: { width: 'fit-content' } } }}
            renderInput={(params) => {
                console.log(params)
                // params.InputProps.value = value
                return <AutoResizeField
                    {...params}
                    // value={value + ""}
                    // inputProps={{
                    //     ...params.InputProps,
                    //     value
                    // }}
                    // value={value + ""}
                    // onChange={(e => {
                    //     onChangeValue(e.target.value)
                    // })}
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
