import { InputProps } from "@/basic/generics";
import { MaxSchema, MaxType } from "@/basic/models/validation/data-types/entities";
import { NumberEntityValidationSchema } from "@/basic/models/validation/data-types/number";
import { StringEntityValidationSchema, StringMaxLengthEntityType, StringMinLengthEntityType, StringRegexEntityType } from "@/basic/models/validation/data-types/string";
import React, { ChangeEvent, useState } from "react";
// import { TypeNameViewContainer } from "../type-name-container";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi from "joi";
import { SmallIconButton } from "@/app/components/small-icon-button";
// import RemoveIcon from '@mui/icons-material/Remove';
import RemoveIcon from '@mui/icons-material/Remove';
import { TypeNameViewContainer } from "../type-name-container";

interface IProps<Value = StringRegexEntityType> extends InputProps<Value> {
    onRemove: () => void
}
export const Regex: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entity = { value: "" } } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {
        const newEntity = {
            value: e.target.value
        };
        setValue({
            ...value,
            entity: newEntity,
        })
    })
    const { getError } = getValidation(StringEntityValidationSchema, false)


    return <>
        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
            <AutoResizeField
                type="text"
                value={entity.value}
                variant="outlined"
                size="small"
                onChange={onChangeMAxValue}
                autoFocus
                sx={{ minHeight: "1.5em", minWidth: "1em" }}
                hiddenLabel
                {...getError()}

            />
        </TypeNameViewContainer>
    </>;
});

