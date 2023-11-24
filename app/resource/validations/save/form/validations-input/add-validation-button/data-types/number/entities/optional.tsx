import { InputProps } from "@/basic/generics";
import { MaxSchema, MaxType } from "@/basic/models/validation/data-types/entities";
import { NumberEntityValidationSchema, NumberEntityValidationType, NumberOptionalEntityType, } from "@/basic/models/validation/data-types/number";
import { StringEntityValidationSchema, StringMaxLengthEntityType, StringMinLengthEntityType, StringOptionalEntityType } from "@/basic/models/validation/data-types/string";
import React, { ChangeEvent, useState } from "react";
// import { TypeNameViewContainer } from "../type-name-container";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi from "joi";
import { TypeNameViewContainer } from "../../type-name-container";


interface IProps extends InputProps<NumberOptionalEntityType> {
    onRemove: () => void
}
export const Optional: React.FC<IProps> = React.memo(({ value = {}, setValue, getValidation, onRemove }) => {
    // const { entity = { value: 0 } } = value

    // const onChangeMAxValue = useMemoCall((e: ChangeEvent<HTMLInputElement>) => {
    //     // const newEntity = {
    //     //     value: parseInt(e.target.value)
    //     // };
    //     setValue({
    //         ...value,
    //         entity: newEntity,
    //     })
    // })
    // const { getError } = getValidation(Joi.object(NumberEntityValidationSchema), false)

    // console.log({ value, error: getError() })


    return <>
        <TypeNameViewContainer type={value.type} onRemove={onRemove}>
        </TypeNameViewContainer>
    </>;
});

