import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
// import { MaxSchema, MaxType } from "@/basic/models/validation/data-types/entities";
// import { NumberEntityValidationSchema } from "@/basic/models/validation/data-types/number";
// import { StringEntityValidationSchema, StringMaxLengthEntityType, StringMinLengthEntityType } from "@/basic/models/validation/data-types/string";
import React, { ChangeEvent, useState } from "react";
// import { TypeNameViewContainer } from "../type-name-container";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi from "joi";
import { TypeNameViewContainer } from "../type-name-container";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import { StringEntityValidationSchema, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";


interface IProps extends InputProps<ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.MinLength>> {
    onRemove: () => void
}
export const MinLength: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entityValue = 0 } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {
        const newEntity = {
            value: parseInt(e.target.value)
        };
        setValue({
            ...value,
            entityValue: parseInt(e.target.value)
        })
    })
    const { getError } = getValidation(StringEntityValidationSchema, false)


    return <>
        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
            <AutoResizeField
                type="number"
                value={entityValue}
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

