"use client"
import React from 'react';
import { ResourceTable } from './table';
import { ResourceTabsEnum, resourceTabsEnums } from './tab-props/utils';



interface IProps {
    searchParams?: {
        start?: string;
        end?: string;
        tab?: ResourceTabsEnum;
    }
}
export default ({ searchParams }: IProps) => {
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