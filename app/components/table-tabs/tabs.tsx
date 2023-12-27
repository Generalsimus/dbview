// import { Stack, Tab } from "@mui/material";
import React, { Component, ComponentProps, ReactNode, useState } from "react";
import { Stack, Tab, Tabs } from '@mui/material';

interface IProps<T extends string | number = string | number> {
    tabs: T[],
    tab: T,
    getTabProps?: (tab: T) => ComponentProps<typeof Tab>
    rightSideContent?: ReactNode
}
export const TabsContent: React.FC<IProps> = React.memo(({ tab, tabs, getTabProps, rightSideContent = <div /> }) => {


    return <>
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            spacing={2}
            padding="10px"
        >
            <Tabs
                value={tab}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                aria-label="scrollable auto tabs example"
            >
                {tabs.map((e) => {
                    // console.log({ EEE: (getTabProps?.(e) || {}) })
                    return <Tab key={e} {...(getTabProps?.(e) || {})} />
                })}
            </Tabs>
            {rightSideContent}
        </Stack>
    </>;
});
