"use client"
import { SaveRouteView } from "@/app/resource/routes/save";
import { Stack } from "@mui/material";
import React, { ReactNode, useState } from "react";
import { useResourceTabs } from "../tabs-content";
import { Route } from "@/basic/models/route";

interface IProps {
    rightSideContent?: ReactNode
}
export const HeaderContent: React.FC<IProps> = React.memo(({ rightSideContent }) => {
    const tabs = useResourceTabs()

    return <>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={2}
            padding="10px"
        >
            {tabs}
            {rightSideContent ? rightSideContent : <div />}
        </Stack>
    </>;
});
