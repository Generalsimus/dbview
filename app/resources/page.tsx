
import React from 'react';
import { ResourceTable } from './table';
import { ResourceTabsEnum, resourceTabsEnums } from './tab-props/utils';
import { PickOnTopContent } from '../components/pick-on-top/pick-on-top-content';



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
        <PickOnTopContent>
            <ResourceTable
                start={start}
                end={end}
                tab={tab}
            />
        </PickOnTopContent>
    </>
}