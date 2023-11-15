import { useMemoCall } from "@/app/utils/hooks";
import { ValidationBlockType } from "@/basic/models/validation/validation";
import { TextField, Typography } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

interface IProps {
    property: ValidationBlockType["property"],
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur: () => void
    startEditing: boolean
}
export const PropertyNameInput: React.FC<IProps> = React.memo(({ property, onChange, startEditing, onBlur }) => {
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
            value={property}
            variant="outlined"
            size="small"
            onChange={onChange}
            onBlur={onEndEditing}
            autoFocus
            onKeyDown={onOnKeyDown}
            hiddenLabel /> : <Typography onClick={onStartEditing}>{property}</Typography>}
    </>;
});
