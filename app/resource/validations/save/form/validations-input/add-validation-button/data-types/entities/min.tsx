import React, { ChangeEvent, useState } from "react";
import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import { TextField, Typography, styled } from "@mui/material";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import { TypeNameViewContainer } from "../type-name-container";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import { NumberEntityValidationSchema, NumberEntityValidationType, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import Joi from "joi";



// interface IProps<Value = NumberMinEntityType> extends InputProps<Value> {
//     onRemove: () => void
// }
interface IProps extends InputProps<ExtractTypeWithProp<NumberEntityValidationType, "type", EntityValidateEnums.Min>> {
    onRemove: () => void
}
export const Min: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entityValue = 0 } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {

        setValue({
            ...value,
            entityValue: parseInt(e.target.value),
        })
    })
    const { getError } = getValidation(NumberEntityValidationSchema, false)

    // console.log({ value, error: getError() })
    // const onRemoveHandler = useMemoCall(() => {
    //     onRemove(value);
    // })

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

