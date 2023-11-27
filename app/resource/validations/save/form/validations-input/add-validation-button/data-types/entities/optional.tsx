import React, { ChangeEvent, useState } from "react"; 
import { ExtractTypeWithProp, InputProps } from "@/basic/generics";
import { TextField, Typography, styled } from "@mui/material";
// import { useChangeSetProps, useMemoCall } from "@/app/utils/hooks";
import { IconButton, Stack } from "@mui/material";
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import Joi from "joi";
import { TypeNameViewContainer } from "../type-name-container";
import { EntityValidateEnums } from "@/basic/models/validation/data-types/enums";
import { StringEntityValidationType } from "@/basic/models/validation/data-types/schema";


interface IProps extends InputProps<ExtractTypeWithProp<StringEntityValidationType, "type", EntityValidateEnums.Optional>> {
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

