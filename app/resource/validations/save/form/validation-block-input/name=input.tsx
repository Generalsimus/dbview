import { useChangeSetProps, useMemoCall, useSetProps } from "@/app/utils/hooks";
import { InputChange } from "@/basic/generics";
import { ValidationPropertyType } from "@/basic/models/validation/validation";
import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

interface IProps extends InputChange<ValidationPropertyType["property"]> {
    // startEditing: boolean
}
export const PropertyNameInput: React.FC<IProps> = React.memo(({ value: initialValue = "", onChange }) => {
    const {
        state: {
            value,
            isEditing
        },
        setProps,
        initSetProps
    } = useSetProps({
        value: initialValue,
        isEditing: initialValue.length === 0
    });

    const onBlur = useMemoCall(() => {
        onChange(value);
        setProps("isEditing")(false)
    });

    const onOnKeyDown = useMemoCall((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onBlur()
        }
    })
    const onStartEditing = useMemoCall(() => {
        setProps("isEditing")(true)
    })

    return <>
        {isEditing ? <TextField
            value={value}
            variant="outlined"
            size="small"
            onChange={initSetProps("target", "value")("value")}
            onBlur={onBlur}
            autoFocus
            onKeyDown={onOnKeyDown}
            hiddenLabel /> : <Typography onClick={onStartEditing}>{value}</Typography>}
    </>;
});
