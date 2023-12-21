"use client"
import { stringToRoutePath } from '@/utils';
import { Stack, Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';


export const enum ResourceTabsEnum {
    Routes = "Routes",
    Validations = "Validations",
    Services = "Services",
}
const TabsComponentContext = createContext({
    setTab: (tab: ResourceTabsEnum) => { },
    setRightSideContent: (content: ReactNode) => { }
} as const)

export const useTabsContext = () => {
    return useContext(TabsComponentContext)
}


const routes: ResourceTabsEnum[] = [
    ResourceTabsEnum.Routes,
    ResourceTabsEnum.Validations,
    ResourceTabsEnum.Services
]


interface IProps {
    children: ReactNode
}
export const ResourceTabsProvider: React.FC<IProps> = React.memo(({ children }) => {
    const [tab, setTab] = useState<ResourceTabsEnum | undefined>()
    const [rightSideContent, setRightSideContent] = useState<ReactNode>()
    // const tabsValue = useMemo(() => <Tabs
    //     value={tab}
    //     variant="scrollable"
    //     scrollButtons="auto"
    //     allowScrollButtonsMobile
    //     aria-label="scrollable auto tabs example"
    // >
    //     {routes.map(e => {
    //         return <Tab
    //             href={`/resource/${stringToRoutePath(e)}`}
    //             component={Link}
    //             label={e}
    //             value={e}
    //         />
    //     })}
    // </Tabs>, [tab])

    return <TabsComponentContext.Provider value={{
        setTab,
        setRightSideContent,
    }}>
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
                {routes.map(e => {
                    return <Tab
                        href={`/resource/${stringToRoutePath(e)}`}
                        component={Link}
                        label={e}
                        value={e}
                    />
                })}
            </Tabs>
            {rightSideContent}
        </Stack>
    </TabsComponentContext.Provider>


})

