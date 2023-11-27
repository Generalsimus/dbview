import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import React, { ChangeEvent, useState } from "react";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi from "joi";
import { SmallIconButton } from "@/app/components/small-icon-button";
import { TypeNameViewContainer } from "../type-name-container";
import { StringEntityValidationSchema, StringEntityValidationType } from "@/basic/models/validation/data-types/schema";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";


interface IProps extends InputProps<ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.MaxLength>> {
    onRemove: () => void
}
export const MaxLength: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    const { entityValue = 0 } = value

    const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            entityValue: parseInt(e.target.value),
        })
    })
    const { getError } = getValidation(StringEntityValidationSchema, false)

    // console.log({ value, error: getError() })
    // const onRemove = useMemoCall(() => {
    //     setValue(undefined)
    // })
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

