import { Stack, TextField, Typography, styled } from "@mui/material";
import React, { ComponentProps, useState } from "react";

interface IProps extends ComponentProps<typeof TextField> {
}
export const AutoResizeField: React.FC<IProps> = React.memo(styled(({ className, ...props }: IProps) => {

    return <Stack minWidth={5} position="relative" className={className}>
        <Typography sx={{ opacity: 0, pointerEvents: "none", padding: "0 .2em" }}>{(props?.value ?? "") + ""}</Typography>
        <TextField {...props} />
    </Stack>
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

//   input[type="number"]::-webkit-outer-spin-button,
// input[type="number"]::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//     margin: 0;
// }
// input[type="number"] {
//     -moz-appearance: textfield;
// }