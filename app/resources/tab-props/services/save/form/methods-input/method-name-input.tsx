import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import React, { MouseEvent, useRef } from "react";
import { Stack } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AutoResizeField } from "@/app/components/auto-resize-field";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";

interface IProps extends InputProps<Service["methods"][number]> {
    onRemove: () => void
}
export const MethodNameInput: React.FC<IProps> = React.memo(({ value, setValue, initSetProps, getPropState, onRemove }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onStopExpandClick = useMemoCall((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    });
    const onFocusName = useMemoCall((e: MouseEvent) => {
        onStopExpandClick(e)
        inputRef.current?.focus();
    });

    const removeMethod = useMemoCall((e: MouseEvent) => {
        onRemove();
        onStopExpandClick(e);
    });
    return <>
        <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
            <AutoResizeField
                sx={{
                    minWidth: "1em",
                    minHeight: "1.5em",
                }}
                value={value.name}
                variant="outlined"
                size="small"
                onChange={initSetProps("target", "value")("name")}
                autoFocus
                hiddenLabel
                inputRef={inputRef}
                onClick={onStopExpandClick}
            />
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={onFocusName}
            >
                <EditIcon />
            </IconButton>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={removeMethod}
            >
                <DeleteIcon />
            </IconButton>
        </Stack>
    </>;
});
