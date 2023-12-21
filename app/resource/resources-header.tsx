"use client"
import { Stack } from "@mui/material";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ResourceTabsEnum, useTabsContext } from "./resources-tabs";


interface IProps {
    tab: ResourceTabsEnum,
    rightSideContent: ReactNode
}
export const ResourcesHeaderContent: React.FC<IProps> = React.memo(({ tab, rightSideContent }) => {
    // const [tabComponent, setTab] = useTabsContext();
    // useEffect(() => {
    //     setTab(tab)
    // }, [tab])

    return <>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={2}
            padding="10px"
        >
            {/* {tabComponent} */}
            {rightSideContent}
        </Stack>
    </>;
});
