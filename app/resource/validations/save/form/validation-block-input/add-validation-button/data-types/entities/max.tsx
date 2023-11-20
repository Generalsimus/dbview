import { InputChange } from "@/basic/generics";
import { MaxType } from "@/basic/models/validation/data-types/entities";
import { NumberMaxLengthEntityType } from "@/basic/models/validation/data-types/number";
import { StringMaxLengthEntityType, StringMinLengthEntityType } from "@/basic/models/validation/data-types/string";
import React, { ChangeEvent, useState } from "react";
import { TypeNameViewContainer } from "../type-name-container";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/aut0-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps extends InputChange<StringMaxLengthEntityType | NumberMaxLengthEntityType> {
    // value: 
    // onChange: (newValue: StringMaxLengthEntityType | NumberMaxLengthEntityType) => void
}
export const Max: React.FC<IProps> = React.memo(({ value = {}, onChange }) => {
    const { entity } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {
        const newEntity = {
            value: parseInt(e.target.value)
        };
        onChange({
            ...value,
        })
    })

    return <>
        <TypeNameViewContainer type={value.type} >
            <AutoResizeField
                type="number"
                value={entity?.value}
                variant="outlined"
                size="small"
                onChange={onChangeMAxValue}
                autoFocus
                sx={{ minHeight: "1em", minWidth: "1em" }}
                hiddenLabel

            />
        </TypeNameViewContainer>
    </>;
});

