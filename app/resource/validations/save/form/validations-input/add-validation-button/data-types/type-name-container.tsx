import { Stack, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";

interface IProps {
    children?: ReactNode
    type?: ReactNode
}
export const TypeNameViewContainer: React.FC<IProps> = React.memo(({ children, type }) => {

    return <Stack display={"flex"} flexDirection={"row"} alignItems={"center"} gap={0.4}>
        <Typography>.{type}(</Typography>
        {children}
        <Typography>)</Typography>
    </Stack>;
});
