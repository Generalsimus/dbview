
"use client"
import { stringToRoutePath } from '@/utils';
import { Tab, Tabs } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react';




const TabsContext = createContext(<div />)

export const useResourceTabs = () => {
    return useContext(TabsContext)
}

const routes: string[] = [
    "Routes",
    "Services",
]
interface IProps {
    children: ReactNode
}
export const TabsContextContainer: React.FC<IProps> = React.memo(({ children }) => {
    const [tab, setTab] = useState<string>(routes[0])
    const tabRef = useRef<string | undefined>();

    const router = useRouter();
    useEffect(() => {
        const prevTab = tabRef.current;
        if (!prevTab) {
            router.replace(`/resource/${stringToRoutePath(tab)}`)
        } else {
            router.push(`/resource/${stringToRoutePath(tab)}`)
        }
        tabRef.current = tab;
    }, [tab])





    const tabs = <Tabs
        value={tab}
        onChange={(e, v) => {
            setTab(v)
        }}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
    >
        {routes.map(e => {
            return <Tab label={e} value={e} />
        })}
    </Tabs>
    return <TabsContext.Provider value={tabs}>
        {children}
    </TabsContext.Provider>
})