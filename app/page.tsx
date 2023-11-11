"use client"
import { Tab, Tabs } from '@mui/material';
import React, { ReactNode, useState } from 'react';


interface TabType {
  label: string,
  routePath: string
}
const routes: TabType[] = [
  { label: "Routes", routePath: "/paths" },
  { label: "Services", routePath: "/services" }
]
export default function Index() {

  const [tab, setTab] = useState<TabType>(routes[0])

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
}