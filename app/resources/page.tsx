"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { TableTabs } from '../components/table-tabs';
import { ResourceTable, ResourceTabsEnum, resourceTabsEnums } from './table';



interface IProps {
    searchParams?: {
        start?: string;
        end?: string;
        tab?: ResourceTabsEnum;
    }
}
export default async ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;
    let tab = searchParams?.tab || ResourceTabsEnum.Routes;

    if (!resourceTabsEnums.includes(tab)) {
        tab = ResourceTabsEnum.Routes;
    }


    return <>
        <ResourceTable
            start={start}
            end={end}
            tab={tab}
        />
    </>
}