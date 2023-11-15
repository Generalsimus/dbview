import { useMemoCall } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

interface IProps {
    name: ValidationBlockType["name"],
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    startEditing: boolean
}
export const NameInput: React.FC<IProps> = React.memo(({ name, onChange, startEditing, onBlur }) => {
    const [editStarted, setEditIsStarted] = useState(startEditing)

    const onEndEditing = useMemoCall(() => {
        setEditIsStarted(false);
        onBlur()
    })
    const onStartEditing = useMemoCall(() => {
        onBlur()
        setEditIsStarted(true);
    })
    const onOnKeyDown = useMemoCall((event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            onEndEditing()
        }
    })
    return <>
        {editStarted ? <TextField
            value={name}
            variant="outlined"
            size="small"
            onChange={onChange}
            onBlur={onEndEditing}
            autoFocus
            onKeyDown={onOnKeyDown}
            hiddenLabel /> : <Typography onClick={onStartEditing}>{name}</Typography>}
    </>;
});
