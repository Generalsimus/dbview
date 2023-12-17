import { Stack, Typography, styled } from "@mui/material";
import React, { ComponentProps, useState } from "react";
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import TextField, { textFieldClasses } from '@mui/material/TextField';
import { formControlClasses } from '@mui/material/FormControl';
import { autocompleteClasses } from '@mui/material';
import { ErrorText } from "./error-text";


interface IProps extends ComponentProps<typeof TextField> {
}
export const AutoResizeField: React.FC<IProps> = React.memo(styled(({ className, helperText, ...props }: IProps) => {
    // inputProps
    // props?.inputProps?.value

    return <HelperTextToolTip title={helperText} placement="top" open={!!helperText} arrow>
        <Stack minWidth={5} position="relative" className={className}>
            <Typography sx={{ opacity: 0, pointerEvents: "none", padding: "0 .2em", whiteSpace: "pre" }} >{((props?.value || props?.inputProps?.value) ?? "") + ""}</Typography>
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
        [`& .${formControlClasses.root}, & .${formControlClasses.root} *:not(.${autocompleteClasses.endAdornment})`]: {
            position: "absolute",
            boxSizing: "border-box",
            padding: "0 !important",
            margin: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            maxWidth: "100% !important",
            maxHeight: "100% !important",
            width: "100% !important",
            height: "100% !important",
            textAlign: "center !important"
        },
        [`& .${autocompleteClasses.endAdornment}`]: {
            display: "none",
        }
    })
}))

// MuiAutocomplete-endAdornment 
const HelperTextToolTip = styled(({ className, title, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} title={<ErrorText error={title} />} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.background.default,
        maxWidth: 220,
        textAlign: "center",
        border: `1px solid ${theme.palette.error.light}`,
    },
    [`& .${tooltipClasses.arrow}::before`]: {
        border: `1px solid ${theme.palette.error.light}`,
        color: theme.palette.background.default,
    }
})); 