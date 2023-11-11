"use client"
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useRef, useState } from 'react';


interface TabType {
    label: string,
    routePath: string
}
const routes: TabType[] = [
    { label: "Routes", routePath: "/paths" }
]
interface IProps {
    defaultRoute?: string
}
export const TabsList: React.FC<IProps> = React.memo(({ }) => {
    const [tab, setTab] = useState<TabType>(routes[0])
    const currentTabRef = useRef("/")
    const router = useRouter();

    useEffect(() => {
        if (currentTabRef.current !== tab.routePath) {
            router.push(tab.routePath)
            currentTabRef.current = tab.routePath;
        }
    }, [tab.routePath])
    return <>
        <Tabs
            value={tab}
            onChange={(e, v) => {
                setTab(v)
            }}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            {routes.map(e => {
                return <Tab label={e.label} value={e} />
            })}
        </Tabs>
    </>
})
