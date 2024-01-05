import { Validator } from "@/app/utils/hooks/useSetProps/create=validation-controller";
import { InputProps } from "@/basic/generics";
import { Service } from "@/basic/models/services/services";
import React, { MouseEvent, useRef, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, Paper, Stack } from "@mui/material";
import { MonacoEditor } from "@/app/components/monaco-editor";
import { useMemoCall } from "@/app/utils/hooks/useMemoCall";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { AutoResizeField } from "@/app/components/auto-resize-field";
import { accordionSummaryClasses } from '@mui/material';

interface IProps extends InputProps<Service["methods"][number]["name"]> {
    // validator: Validator<Service>
}
export const MethodNameInput: React.FC<IProps> = React.memo(({ value, setValue, initSetProps, getPropState }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onStopExpandClick = useMemoCall((e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
    });
    const onFocusName = useMemoCall((e: MouseEvent) => {
        onStopExpandClick(e)
        inputRef.current?.focus();
    })
    return <>
        <Stack display={"flex"} flexDirection={"row"} justifyContent={"flex-start"} alignItems={"center"}>
            <AutoResizeField
                sx={{
                    minWidth: "1em",
                    minHeight: "1.5em",
                }}
                value={value}
                variant="outlined"
                size="small"
                onChange={initSetProps("target", "value")()}
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
        </Stack>
    </>;
});
