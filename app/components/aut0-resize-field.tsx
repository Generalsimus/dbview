import { Stack, TextField, Typography, styled } from "@mui/material";
import React, { ComponentProps, useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

interface IProps extends ComponentProps<typeof TextField> {
}
export const AutoResizeField: React.FC<IProps> = React.memo(styled(({ className, helperText, ...props }: IProps) => {


    return <HelperTextToolTip title={helperText} placement="top" open={!!helperText}>
        <Stack minWidth={5} position="relative" className={className}>
            <Typography sx={{ opacity: 0, pointerEvents: "none", padding: "0 .2em" }}>{(props?.value ?? "") + ""}</Typography>
            <TextField {...props} />
        </Stack>
    </HelperTextToolTip>
})(({ theme }) => {

    return ({
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            WebkitAppearance: "none",
            display: "none",
        },
        "& input[type=number]": {
            MozAppearance: "textfield",
        },
        "& .MuiFormControl-root, & .MuiFormControl-root *": {
            position: "absolute",
            boxSizing: "border-box",
            padding: 0,
            margin: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            width: "100%",
            height: "100%",
            textAlign: "center"

        },
    })
}))

const HelperTextToolTip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        maxWidth: 220,
        color: "red",
        fontSize: theme.typography.pxToRem(12),
        textAlign: "center",
        border: '1px solid #dadde9',
    },
})); 