import { Typography, useTheme } from "@mui/material";
import React, { ComponentProps, ReactNode, useState } from "react";

interface IProps extends ComponentProps<typeof Typography> {
    error: ReactNode | undefined
}
export const ErrorText: React.FC<IProps> = React.memo(({ error: errorText, ...props }) => {
    const theme = useTheme()

    return <>
        {errorText && <Typography {...props} sx={{
            color: theme.palette.error.light,
            fontSize: theme.typography.pxToRem(12),
            textAlign: "center"
        }} >{errorText}</Typography>}
    </>;
});
