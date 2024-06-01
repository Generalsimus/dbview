
import React, { ComponentProps } from 'react';
// import { ResourceTable } from './table';
// import { ResourceTabsEnum, resourceTabsEnums } from './tab-props/utils';
// import { PickOnTopContent } from '../components/pick-on-top/pick-on-top-content';
import { RoutesPage } from '.';
import { Pagination } from '@/app/components/pagination';



// export type RoutePaginationParams = 

interface IProps {
    searchParams?: Partial<Pick<ComponentProps<typeof Pagination>, "start" | "end">>
}
export default ({ searchParams }: IProps) => {
    let start = Number(searchParams?.start) || 0;
    let end = Number(searchParams?.end) || 15;


    return <>
        <RoutesPage start={start} end={end} />
    </>
}