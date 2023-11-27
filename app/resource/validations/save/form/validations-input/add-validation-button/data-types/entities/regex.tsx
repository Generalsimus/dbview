import React, { ChangeEvent, ReactNode, SyntheticEvent, useState } from "react";
import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import { Autocomplete, Box, TextField, Typography, styled } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
// import Joi from "joi";
import { TypeNameViewContainer } from "../type-name-container";
import { StringEntityValidationSchema, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";


type Option = {
    label: ReactNode,
    value: string
}
interface IProps extends InputProps<ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.Regex>> {
    onRemove: () => void
}
export const Regex: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entityValue = "" } = value

    const onSelectOption = useMemoCall((event: unknown, newValue: string) => {
        if (newValue in RegexList) {
            newValue = RegexList[newValue];
        }
        setValue({
            ...value,
            entityValue: newValue,
        })
    })

    const { getError } = getValidation(StringEntityValidationSchema, false)

    const options = Object.keys(RegexList)
    return <>
        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
            <Autocomplete
                disablePortal
                freeSolo
                value={entityValue}
                options={options}
                disableClearable
                disableListWrap
                onChange={onSelectOption}
                autoFocus
                // Adore
                getOptionLabel={(option) => RegexList[option]}
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
                        {...getError()}

                    />
                }}
            />
        </TypeNameViewContainer>
    </>;
});

const RegexList: Record<string, string> = {
    Email: "/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/"
}